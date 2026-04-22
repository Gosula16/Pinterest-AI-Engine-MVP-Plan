import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

const canUpload =
  !!env.CLOUDINARY_CLOUD_NAME && !!env.CLOUDINARY_API_KEY && !!env.CLOUDINARY_API_SECRET;

if (canUpload) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
  });
}

export async function renderPinImage(pin: { title: string; keyword: string; color?: string }) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${pin.color ?? "#102a6b"}" />
        <stop offset="100%" stop-color="#201336" />
      </linearGradient>
    </defs>
    <rect width="1000" height="1500" fill="url(#g)" />
    <rect x="80" y="890" rx="28" ry="28" width="840" height="430" fill="#f8fafc" opacity="0.98" />
    <text x="110" y="980" fill="#0f172a" font-family="Arial" font-size="64" font-weight="700">${escapeXml(
      pin.title
    )}</text>
    <text x="110" y="1080" fill="#334155" font-family="Arial" font-size="34">${escapeXml(
      pin.keyword
    )}</text>
    <rect x="110" y="1180" rx="24" ry="24" width="280" height="82" fill="#e11d48" />
    <text x="155" y="1233" fill="#ffffff" font-family="Arial" font-size="34" font-weight="700">Shop Now</text>
  </svg>
  `.trim();

  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  if (!canUpload) {
    return dataUri;
  }

  const uploaded = await cloudinary.uploader.upload(dataUri, {
    folder: "pinengine/pins",
    public_id: pin.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 48)
  });

  return uploaded.secure_url;
}

function escapeXml(input: string) {
  return input.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

