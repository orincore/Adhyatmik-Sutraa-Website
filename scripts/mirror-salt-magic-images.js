/**
 * Downloads the images used on the live WordPress "Salt Magic Webinar" page
 * (https://adhyatmiksutraa.com/salt-magic-webinar/) and re-uploads them to
 * this project's own Cloudflare R2 bucket (media.adhyatmiksutraa.com), so the
 * new Next.js landing page doesn't hotlink the old WordPress install (which
 * will eventually be decommissioned once this site replaces it).
 *
 * Run from the project root: node scripts/mirror-salt-magic-images.js
 * Prints a JSON map of { sourceUrl: newR2Url } to stdout on success, and
 * writes it to scripts/salt-magic-image-map.json for the page-creation
 * script to consume.
 */
require("dotenv/config");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_URL_BASE = process.env.R2_PUBLIC_URL;

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const IMAGES = [
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2025/10/1.jpeg", name: "salt-magic-hero-thumb.jpeg" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2026/02/Salt-Image-3.jpeg", name: "salt-magic-craft-intention.jpeg" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2025/11/salt-m.png", name: "salt-magic-impactful-salts.png" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2025/10/White-and-Brown-Simple-Cover-Book-Mockup-Instagram-Post-1.png", name: "salt-magic-bonus-money-hacks.png" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2025/10/White-and-Brown-Simple-Cover-Book-Mockup-Instagram-Post-2.png", name: "salt-magic-bonus-subconscious-mind.png" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2025/10/White-and-Brown-Simple-Cover-Book-Mockup-Instagram-Post.png", name: "salt-magic-bonus-crystals-guide.png" },
  { url: "https://adhyatmiksutraa.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-02-07-at-14.53.37-1.jpeg", name: "salt-magic-coach-aparna-singh.jpeg" },
];

function contentTypeFor(name) {
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".jpeg") || name.endsWith(".jpg")) return "image/jpeg";
  return "application/octet-stream";
}

async function main() {
  const map = {};
  for (const img of IMAGES) {
    process.stdout.write(`Fetching ${img.url} ... `);
    const res = await fetch(img.url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    });
    if (!res.ok) {
      console.log(`FAILED (${res.status})`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = img.name.split(".").pop();
    const key = `landing/salt-magic-webinar/${uuidv4()}.${ext}`;
    await r2Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentTypeFor(img.name),
        CacheControl: "public, max-age=31536000",
      })
    );
    const url = `${PUBLIC_URL_BASE}/${key}`;
    map[img.url] = url;
    console.log(`-> ${url}`);
  }

  const outPath = path.join(__dirname, "salt-magic-image-map.json");
  fs.writeFileSync(outPath, JSON.stringify(map, null, 2));
  console.log(`\nWrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
