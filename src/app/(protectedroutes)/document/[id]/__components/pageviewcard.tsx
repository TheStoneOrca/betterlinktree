import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UrlViewCard(props: { cardUrl: string }) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Page Url</CardTitle>
        <CardDescription>
          Your page's url. Share it to give people access to your links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="text" value={props.cardUrl} />
      </CardContent>
    </Card>
  );
}
