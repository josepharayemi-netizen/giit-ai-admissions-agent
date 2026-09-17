import { env } from "cloudflare:workers";
import { courses, giitFacts, matchCourses, programmeLevels } from "./data";

const courseContext = courses.map((c) => `${c.name}: ${c.summary} Skills: ${c.skills.join(", ")}. Careers: ${c.careers.join(", ")}.`).join("\n");
const feeContext = programmeLevels.map((l) => `${l.name}: ${l.fee}, ${l.duration}.`).join(" ");

export async function answerUser(message: string) {
  const q = message.toLowerCase();
  const matched = matchCourses(message);
  const openBooking = /book|appointment|counsell|counsel|schedule a call/.test(q);
  const captureLead = /call me|contact me|register|enrol|enroll|apply|interested/.test(q);

  if (env.OPENAI_API_KEY && env.OPENAI_MODEL) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, "content-type": "application/json" },
        body: JSON.stringify({ model: env.OPENAI_MODEL, instructions: `You are Nia, GIIT Africa's warm, concise admissions assistant. Use only the supplied GIIT facts. Never invent schedules, discounts, accreditation, vouchers or guarantees. When details may change, ask the student to confirm with admissions. Address: ${giitFacts.address}. Phones: ${giitFacts.phones.join(", ")}. Fees: ${feeContext}\nCourses:\n${courseContext}`, input: message }),
      });
      if (response.ok) {
        const data = await response.json() as { output_text?: string };
        if (data.output_text) return { reply: data.output_text, courses: matched.map((c) => c.name), openBooking, captureLead };
      }
    } catch { /* Use the reliable built-in guidance below. */ }
  }

  if (openBooking) return { reply: "Certainly. I’ll open the counselling form so you can choose a preferred date and time. A GIIT Africa adviser will confirm the appointment.", courses: [], openBooking: true, captureLead: false };
  if (/fee|price|cost|duration|how long/.test(q)) return { reply: `GIIT Africa currently uses three programme levels:\n\n• Professional — ₦150,000 for 2 months\n• Master — ₦300,000 for 4 months\n• Career Accelerator — ₦500,000 for 6 months\n\nPlease confirm the final fee, schedule and inclusions for your selected course with admissions before payment.`, courses: [], openBooking: false, captureLead };
  if (/address|location|where/.test(q)) return { reply: `GIIT Africa is at ${giitFacts.address}. You can call or WhatsApp ${giitFacts.phones[0]} for directions and current class schedules.`, courses: [], openBooking: false, captureLead };
  if (matched.length) return { reply: `Based on what you mentioned, ${matched[0].name} looks like the strongest starting point. ${matched[0].summary} Typical career outcomes include ${matched[0].careers.join(" and ")}. ${matched.length > 1 ? `You could also compare ${matched.slice(1).map((c) => c.name).join(" and ")}.` : ""}\n\nWould you like to compare programme levels or book a counselling session?`, courses: matched.map((c) => c.name), openBooking: false, captureLead };
  return { reply: "I can help you choose among Data Analytics, Data Science, AI & Machine Learning, Cybersecurity, Cloud Computing, DevOps, Full-Stack Development, UI/UX, Digital Marketing and Microsoft 365. Tell me the job you want, your current experience and whether you prefer coding, analysis, design or business work.", courses: [], openBooking: false, captureLead };
}
