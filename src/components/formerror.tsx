"use client";

import { AlertTriangleIcon } from "lucide-react";

export default function FormError(props: { message: string }) {
  return (
    <div className="w-full bg-destructive/15 text-white rounded-md h-9 flex items-center gap-x-2">
      <AlertTriangleIcon className="" />
      {props.message}
    </div>
  );
}
