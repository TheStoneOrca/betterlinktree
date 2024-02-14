"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewPageBtn from "./newpagebtn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePageCard from "./createpagecard";

export default function Documents(props: {
  showCardFunction: any;
  card: any;
  documents: Array<any>;
}) {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="ml-24 mr-16">
        <NewPageBtn />
      </div>
      {props.documents.map((document) => (
        <Card
          className="w-52 h-48 dark:bg-[#171717] dark:border-[#171717] dark:text-white"
          key={document.pageid}
        >
          <CardHeader>
            <CardTitle>{document.pagetitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost">
              <Link href={`/document/${document.pageid}`}>Go To</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
