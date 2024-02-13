"use client";

import BuyPremuium from "@/actions/buypremium";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// @ts-ignore
import { loadStripe } from "@stripe/stripe-js";

export default function BuyPremuiumBtn(props: {
  username: string;
  email: string;
  userid: number;
}) {
  return (
    <form
      action={(data) => {
        try {
          BuyPremuium(data).then((res) => {
            if (!res.error) {
              loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC).then(
                (stripe: any) => {
                  stripe.redirectToCheckout({ sessionId: res.session });
                }
              );
            }
          });
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <Input type="hidden" value={props.email} name="email" />
      <Input type="hidden" value={props.username} name="username" />
      <Input type="hidden" value={props.userid} name="userid" />

      <Button type="submit">Buy Premium</Button>
    </form>
  );
}
