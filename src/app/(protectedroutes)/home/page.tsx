"use client";

import useUser from "@/hooks/useuser";
import { Loader2Icon } from "lucide-react";
import Documents from "./__components/documents";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import CreatePageCard from "./__components/createpagecard";
import BuyPremuiumBtn from "@/components/buyprem";
import GetUserDocuments from "@/actions/getalluserdocs";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function HomePage() {
  const [card, showCard] = useState<boolean>();
  const [documents, setDocuments] = useState<Array<any>>();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    try {
      GetUserDocuments(user.userid as any).then((res) => {
        if (res.error) {
          setDocuments([]);
        } else {
          setDocuments(res.documents);
        }
      });
    } catch (error) {
      console.error(error);
      setDocuments([]);
    }
  }, [isLoaded]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        poppins.className
      )}
    >
      {isLoaded && user && documents ? (
        <>
          <div className="absolute flex justify-center">
            <BuyPremuiumBtn
              userid={user.userid as any}
              username={user.username}
              email={user.email}
            />
            {card && (
              <div>
                <CreatePageCard userid={user.userid as any} />
              </div>
            )}
          </div>

          <div className="flex flex-col w-full gap-y-5">
            <h1 className="flex-start">Home</h1>
            <div className="h-[35rem]" />
            <div className="h-full">
              <div className=" flex flex-col w-full dark:bg-[#232527]">
                <h1 className="flex-start">Documents</h1>
                <Documents
                  showCardFunction={showCard}
                  card={card}
                  documents={documents as any}
                />
              </div>
            </div>
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
