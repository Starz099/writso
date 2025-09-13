"use client";
import { usePathname } from "next/navigation";
import { Button } from "./button";

const ShareSubmissionButton = () => {
  const pathname = usePathname();

  const copyLink = () => {
    const link = process.env.NEXT_PUBLIC_APP_URL + pathname;
    alert("link copied to clipboard");
    navigator.clipboard.writeText(link);
  };
  return (
    <Button onClick={copyLink} className="w-1/4 cursor-pointer">
      Share Link
    </Button>
  );
};

export default ShareSubmissionButton;
