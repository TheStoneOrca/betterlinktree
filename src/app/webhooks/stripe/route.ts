import pgInit from "@/actions/pgInit";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Nw7SRFZeswgxgLXPfCVVPvsaJy4bTs5Rdht8kB0AsR4pEbv59jz8Cx0vWap2cu90njmCZzErN7edck78oMKScI300L8h8mIob"
);

export async function POST(Request: Request, Response: Response) {
  const event = await Request.json();

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      const unParsedUserId = await stripe.checkout.sessions.retrieve(
        checkoutSession.id
      );
      const userid: string = unParsedUserId.metadata.userid;
      const database = await pgInit();

      if (database.error || !database.database) {
        break;
      }
      const db = database.database;

      await db.query(
        "INSERT INTO premuimPurchase(purchasingperson) VALUES($1)",
        [Number(userid.replace(/^['"]|['"]$/g, ""))]
      );

      await db.end();

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
