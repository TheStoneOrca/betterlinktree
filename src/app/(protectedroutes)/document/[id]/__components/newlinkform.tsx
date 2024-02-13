"use client";

import CreateLink from "@/actions/createlink";
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
import { X } from "lucide-react";

export default function CreateNewLinkForm(props: {
  documentid: number;
  closingfunction: any;
}) {
  return (
    <Card className="dark:bg-[#0f0f0f] dark:text-white dark:border-black">
      <CardHeader>
        <CardTitle>Create New Link</CardTitle>
        <CardDescription>Create a new link for your site</CardDescription>
        <Button
          variant="destructive"
          onClick={() => props.closingfunction(false)}
        >
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-2"
          action={(data) => {
            try {
              CreateLink(data).then((res) => {
                if (res.success) {
                  window.location.reload();
                }
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
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

          <div>
            <Label>Card Icon</Label>
            <Input type="file" name="cardicon" required />
          </div>

          <div>
            <Label>Card Redirect Link</Label>
            <Input type="text" name="cardhref" required />
          </div>

          <Input type="hidden" name="linkdocument" value={props.documentid} />

          <br />

          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}
