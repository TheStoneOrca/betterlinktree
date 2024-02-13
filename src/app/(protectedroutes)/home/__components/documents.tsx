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

export default function Documents(props: { showCardFunction: any; card: any }) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="ml-24 mr-16">
        <NewPageBtn
          showCardFunction={props.showCardFunction}
          card={props.card}
        />
      </div>
      <Card className="w-52 h-48 dark:bg-[#171717] dark:border-[#171717] dark:text-white">
        <CardHeader>
          <CardTitle>Hi</CardTitle>
          <CardDescription>The Greatest Website</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="ghost">
            <Link href={`/document/1`}>Go To</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
