import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="mt-40 flex flex-col items-center justify-center gap-12 text-6xl">
        Write, Save, Share your thoughts
        <br />
        <Button size="lg" className="cursor-pointer">
          <Link href="/dashboard">Go to Dashboard </Link>
        </Button>
      </div>
    </>
  );
}
