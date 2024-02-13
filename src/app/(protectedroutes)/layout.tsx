"use client";

import useUser from "@/hooks/useuser";
import React, { useEffect } from "react";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) window.location.href = "/signup";
  }, [isLoaded]);
  return <div>{children}</div>;
}
