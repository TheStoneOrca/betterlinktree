"use client";

import useUser from "@/hooks/useuser";
import { Loader2Icon } from "lucide-react";
import Documents from "./__components/documents";

export default function HomePage() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center text-center w-full">
      {isLoaded ? (
        <div className="w-full">
          <div className="w-full dark:bg-[#232527]">
            <Documents />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Loader2Icon className="animate-spin w-64 h-[90vh]" />
          <h1 className="sm:text-4xl md:text-5xl lg:text-2xl">Loading...</h1>
        </div>
      )}
    </div>
  );
}
