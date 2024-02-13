"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateNewLinkForm() {
  return (
    <Card className="dark:bg-[#0f0f0f] dark:text-white dark:border-black">
      <CardHeader>
        <CardTitle>Create New Link</CardTitle>
        <CardDescription>Create a new link for your site</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-2">
          <div>
            <Label>Card Title</Label>
            <Input type="text" name="cardtitle" required />
          </div>

          <div>
            <Label>Card Background Color</Label>
            <Input type="color" name="bgcolor" required />
          </div>

          <div>
            <Label>Card Text Color</Label>
            <Input type="color" name="textcolor" required />
          </div>

          <br />

          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}
