"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import { useState } from "react";
import CreatePageCard from "./createpagecard";
import useUser from "@/hooks/useuser";

export default function NewPageBtn() {
  const { user, isLoaded } = useUser();
  const [showingCard, setShowingCard] = useState<boolean>();
  return (
    <>
      {isLoaded ? (
        <>
          {showingCard && (
            <div className="absolute ml-auto mr-auto left-0 right-0 w-80">
              <CreatePageCard userid={user?.userid as any} />
            </div>
          )}
          <Button onClick={() => setShowingCard(!showingCard)}>
            <Plus />
          </Button>
        </>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </>
  );
}
