import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { knowledgeSources } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    if (!env.BUCKET) return Response.json({ error: "Document storage is unavailable." }, { status: 503 });
    const form = await request.formData(); const file = form.get("file");
    if (!(file instanceof File) || !file.size) return Response.json({ error: "file is required" }, { status: 400 });
    if (file.size > 15 * 1024 * 1024) return Response.json({ error: "File must be 15 MB or smaller." }, { status: 400 });
    const key = `knowledge/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
    const [source] = await getDb().insert(knowledgeSources).values({ filename: file.name, storageKey: key, contentType: file.type || "application/octet-stream", size: file.size }).returning();
    return Response.json({ source }, { status: 201 });
  } catch { return Response.json({ error: "The document could not be uploaded." }, { status: 503 }); }
}
