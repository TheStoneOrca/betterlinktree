"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NewPageBtn(props: {
  showCardFunction: any;
  card: any;
}) {
  return (
    <Button onClick={() => props.showCardFunction(!props.card)}>
      <Plus />
    </Button>
  );
}
