"use client";

import PublishPage from "@/actions/publishpage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PublishButton(props: { documentid: number }) {
  const [card, showCard] = useState<boolean>();
  const [cardUrl, setCardUrl] = useState<string>();
  return (
    <div>
      <form
        action={(data) => {
          try {
            PublishPage(data).then((res) => {
              if (res.success) {
                showCard(true);
                setCardUrl(res.pageurl);
              }
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Input type="hidden" value={props.documentid} name="pageid" />
        <Button type="submit">Publish</Button>

        {card && (
          <Card>
            <CardHeader>
              <CardTitle>Page Url</CardTitle>
              <CardDescription>
                Your page's url. Share it to give people access to your links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input type="text" value={cardUrl} />
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
