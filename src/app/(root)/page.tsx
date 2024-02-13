"use client";

import { useEffect } from "react";
import Header from "./__components/header";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import HomePageFooter from "./__components/footer";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    document.title = "The New Link Tree";
  }, []);
  return (
    <div className={cn("flex flex-col min-h-screen", poppins.className)}>
      <div className="flex-grow mt-2">
        <Header />
      </div>
      <div className="mt-auto">
        <HomePageFooter />
      </div>
      <div className="mt-12" />
    </div>
  );
}
