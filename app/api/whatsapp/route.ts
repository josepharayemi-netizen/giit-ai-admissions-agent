import { env } from "cloudflare:workers";
import { answerUser } from "../../agent";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const verified = url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === env.WHATSAPP_VERIFY_TOKEN;
  return verified ? new Response(url.searchParams.get("hub.challenge") || "", { status: 200 }) : new Response("Forbidden", { status: 403 });
}
export async function POST(request: Request) {
  const body = await request.json() as any;
  const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message?.text?.body) return Response.json({ received: true });
  const answer = await answerUser(message.text.body);
  if (env.WHATSAPP_ACCESS_TOKEN && env.WHATSAPP_PHONE_NUMBER_ID) {
    await fetch(`https://graph.facebook.com/v22.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, { method: "POST", headers: { authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`, "content-type": "application/json" }, body: JSON.stringify({ messaging_product: "whatsapp", to: message.from, type: "text", text: { body: answer.reply } }) });
  }
  return Response.json({ received: true });
}
