"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useuser";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePageFooter() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex justify-center items-center text-center flex-col">
      {isLoaded ? (
        <div>
          {isSignedIn && (
            <Button asChild className="dark:bg-white dark:text-black">
              <Link href="/home">Continue</Link>
            </Button>
          )}
          {!isSignedIn && (
            <Button asChild className="dark:bg-white dark:text-black">
              <Link href="/signup">Get Started</Link>
            </Button>
          )}
        </div>
      ) : (
        <Loader2Icon className="animate-spin dark:text-white text-black" />
      )}
    </div>
  );
}
