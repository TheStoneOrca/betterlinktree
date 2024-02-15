"use client";

import Documents from "./documents";
import { ModeToggle } from "./toggletheme";

export default function Sidebar(props: { documents: Array<any> }) {
  return (
    <div className="flex flex-col h-full dark:bg-[#232527] w-72">
      <Documents
        documents={props.documents as any}
        showCardFunction={""}
        card={""}
      />
    </div>
  );
}
