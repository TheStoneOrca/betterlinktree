"use client";

import GetPageDetails from "@/actions/getpagedetails";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocumentPageHeader from "./__components/header";
import DocumentTextArea from "./__components/textarea";
import Links from "../../../../components/links";
import CreateNewLinkForm from "./__components/newlinkform";
import NewLinkButton from "./__components/newlinkbtn";
import PublishButton from "./__components/publishbtn";
import useUser from "@/hooks/useuser";
import { Button } from "@/components/ui/button";
import UnPublishButton from "./__components/unpublishbtn";
import UrlViewCard from "./__components/pageviewcard";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function DocumentPage() {
  const [page, setPage] = useState<{
    pagedetails: any;
    pagelinks: Array<any>;
  }>();
  const [newLink, showNewLink] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>();
  const [pageUrl, setPageUrl] = useState<string>();

  const { id } = useParams();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    GetPageDetails(Number(id) as any).then((res) => {
      if (res.error) {
        window.location.href = "/home";
      } else if (res.pagedetails && res.pagelinks) {
        if (user?.userid !== res.pagedetails.pagecreator) {
          window.location.href = "/home";
        } else {
          setPage({ pagedetails: res.pagedetails, pagelinks: res.pagelinks });
          document.title = res.pagedetails.pagetitle;
          setPageUrl(
            `${process.env.NEXT_PUBLIC_DOMAIN}/page/${res.pagedetails.pagetitle
              .replace(/\s+/g, "-")
              .toLowerCase()}?id=${res.pagedetails.pageid}`
          );
        }
      } else {
        window.location.href = "/home";
      }
    });
  }, [isLoaded]);
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        poppins.className
      )}
    >
      {page !== null && page ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col justify-center text-center mt-2">
              <DocumentPageHeader text={page.pagedetails.pagetitle} />
              {page.pagedetails.public === true ? (
                <div>
                  <UnPublishButton documentid={Number(id)} />
                  <Button onClick={() => setShowLink(!showLink)}>
                    Show Link
                  </Button>
                  {showLink && <UrlViewCard cardUrl={pageUrl as any} />}
                </div>
              ) : (
                <PublishButton documentid={Number(id)} />
              )}
            </div>
            <div>
              <DocumentTextArea
                documentid={Number(id)}
                textareatext={page.pagedetails.pagetextcontent}
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <NewLinkButton
                openfunction={showNewLink}
                openstatus={newLink as any}
              />
              <Links links={page.pagelinks} />
            </div>
          </div>
          {newLink && (
            <div className="absolute justify-center items-center text-center">
              <CreateNewLinkForm
                documentid={Number(id)}
                closingfunction={showNewLink}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <Loader2Icon className="animate-spin w-64 h-[90vh]" />
          <h1 className="sm:text-4xl md:text-5xl lg:text-2xl">Loading...</h1>
        </div>
      )}
    </div>
  );
}
