"use server";

import Stripe from "stripe";

export default async function BuyPremuium(data: FormData) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

    const checkOutCustomer = await stripe.customers.create({
      name: data.get("username") as string,
      email: data.get("email") as string,
    });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: 15 * 100,
      product_data: { name: "LinkTree Premium" },
    });

    console.log(price);

    const session = await stripe.checkout.sessions.create({
      customer: checkOutCustomer.id,
      mode: "payment",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        userid: JSON.stringify(data.get("userid")) as string,
      },
      success_url: `${process.env.DOMAIN}/`,
    });

    return { success: true, session: session.id.toString() };
  } catch (error) {
    return { error: error };
  }
}
