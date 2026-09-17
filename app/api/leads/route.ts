import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

export async function GET() {
  try { return Response.json({ leads: await getDb().select().from(leads).orderBy(desc(leads.createdAt), desc(leads.id)).limit(50) }); }
  catch { return Response.json({ leads: [], error: "Admissions records are temporarily unavailable." }, { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, string>;
    const name = body.name?.trim(); const phone = body.phone?.trim();
    if (!name || !phone) return Response.json({ error: "name and phone are required" }, { status: 400 });
    const [lead] = await getDb().insert(leads).values({ name, phone, email: body.email?.trim() || "", interest: body.interest?.trim() || "", source: body.source?.trim() || "website" }).returning();
    return Response.json({ lead }, { status: 201 });
  } catch { return Response.json({ error: "The enquiry could not be saved." }, { status: 503 }); }
}
