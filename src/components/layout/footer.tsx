import { Container } from "@/components/ui/container";
import { PenTool, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 mt-auto border-t backdrop-blur">
      <Container>
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
                <PenTool className="h-3 w-3" />
              </div>
              <span className="text-sm font-medium">Writso</span>
              <span className="text-muted-foreground hidden text-sm sm:inline">
                •
              </span>
              <span className="text-muted-foreground hidden text-sm sm:inline">
                Practice. Write. Improve.
              </span>
            </div>

            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-red-500" />
              <span>by</span>
              <a
                href="https://github.com/Starz099"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                @Starz099
              </a>
              <span>• © {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
