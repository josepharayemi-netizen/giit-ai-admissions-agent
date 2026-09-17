import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";

export async function GET() {
  try { return Response.json({ bookings: await getDb().select().from(bookings).orderBy(desc(bookings.createdAt), desc(bookings.id)).limit(50) }); }
  catch { return Response.json({ bookings: [], error: "Bookings are temporarily unavailable." }, { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    const b = await request.json() as Record<string, string>;
    if (!b.name?.trim() || !b.phone?.trim() || !b.course?.trim() || !b.preferredDate?.trim() || !b.preferredTime?.trim()) return Response.json({ error: "Complete all required fields." }, { status: 400 });
    const [booking] = await getDb().insert(bookings).values({ name: b.name.trim(), phone: b.phone.trim(), email: b.email?.trim() || "", course: b.course.trim(), preferredDate: b.preferredDate.trim(), preferredTime: b.preferredTime.trim(), notes: b.notes?.trim() || "" }).returning();
    return Response.json({ booking }, { status: 201 });
  } catch { return Response.json({ error: "The booking could not be saved." }, { status: 503 }); }
}
