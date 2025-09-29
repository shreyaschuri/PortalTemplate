import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readJson<T>(fileName: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const file = path.join(dataDir, fileName);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    // initialize with fallback
    await fs.writeFile(file, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  await ensureDataDir();
  const file = path.join(dataDir, fileName);
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, file); // atomic replace
}
