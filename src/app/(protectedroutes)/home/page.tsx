"use client";

import useUser from "@/hooks/useuser";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import BuyPremuiumBtn from "@/components/buyprem";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function HomePage() {
  const [card, showCard] = useState<boolean>();
  const { isLoaded, user } = useUser();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        poppins.className
      )}
    >
      {isLoaded && user ? (
        <>
          <div className="absolute flex justify-center"></div>

          <div className="flex flex-col w-full gap-y-5">
            <div className="flex justify-center">
              <h1>Home</h1>
              <div className="flex-start">
                <BuyPremuiumBtn
                  userid={user.userid as any}
                  username={user.username}
                  email={user.email}
                />
              </div>
            </div>
            <div className="h-[34rem]" />
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <Loader2Icon className="animate-spin w-64 h-[90vh]" />
          <h1 className="sm:text-4xl md:text-5xl lg:text-2xl">Loading...</h1>
        </div>
      )}
    </div>
  );
}
