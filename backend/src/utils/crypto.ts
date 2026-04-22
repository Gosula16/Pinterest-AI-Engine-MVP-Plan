import crypto from "node:crypto";
import { env } from "../config/env.js";

const ivLength = 16;
const key = crypto.createHash("sha256").update(env.ENCRYPTION_KEY).digest();

export function encryptSecret(value: string) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptSecret(value?: string | null) {
  if (!value) {
    return "";
  }
  const [ivHex, encryptedHex] = value.split(":");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(ivHex, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final()
  ]);
  return decrypted.toString("utf8");
}

