import { Container } from "@/components/ui/container";
import { PenTool, Heart } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-muted/30 mt-auto border-t">
      <Container>
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Logo and Description */}
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded">
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

            {/* Copyright */}
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500" />
              <span>by</span>
              <span className="font-medium">@Starz099</span>
              <span>• © 2025</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
