"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type links = {
  linkid: number;
  linkhref: string;
  linkcolor: string;
  linkicon: string;
  linkname: string;
  textcolor: string;
};

export default function Links(props: { links: Array<any> }) {
  return (
    <div>
      {props.links.map((link: links) => (
        <div
          className={`flex w-48 rounded-md bg-[${link.linkcolor}] text-[${link.textcolor}] `}
        >
          <img src={link.linkicon} className="w-8" />
          <Button asChild key={link.linkid} variant="ghost" className={``}>
            <Link href={link.linkhref}>{link.linkname}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
