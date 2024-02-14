"use client";

import Sidebar from "@/components/sidebar";
import useUser from "@/hooks/useuser";
import React, { useEffect, useState } from "react";
import GetUserDocuments from "@/actions/getalluserdocs";
import { Loader2Icon } from "lucide-react";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [documents, setDocuments] = useState<Array<any>>();

  useEffect(() => {
    try {
      if (!isLoaded || !user) return;
      if (!isSignedIn) window.location.href = "/signup";
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
    <div className="h-full flex">
      {documents ? (
        <Sidebar documents={documents} />
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
      {children}
    </div>
  );
}
