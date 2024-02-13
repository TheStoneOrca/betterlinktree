"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function FormRedirect(props: { type: "signup" | "login" }) {
  return (
    <div>
      {props.type === "signup" && (
        <Button asChild variant="ghost" className="text-white w-full">
          <Link href="/signin">Already Signed Up? Sign In Instead!</Link>
        </Button>
      )}
      {props.type === "login" && (
        <Button asChild variant="ghost" className="text-white w-full">
          <Link href="/signup">Already Signed Up? Sign In Instead!</Link>
        </Button>
      )}
    </div>
  );
}
