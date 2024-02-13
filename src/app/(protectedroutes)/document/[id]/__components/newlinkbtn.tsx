"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NewLinkButton(props: {
  openfunction: any;
  openstatus: boolean;
}) {
  return (
    <Button
      onClick={() => {
        props.openfunction(!props.openstatus);
      }}
    >
      <Plus />
    </Button>
  );
}
