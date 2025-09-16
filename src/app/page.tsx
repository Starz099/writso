import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section size="xl" className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="bg-primary/10 absolute top-20 left-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute right-10 bottom-20 h-96 w-96 rounded-full blur-3xl" />
        </div>

        <Container className="text-center">
          <div className="mx-auto max-w-4xl">
            {/* Badge */}
            <div className="bg-muted text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Sharpen your writing skills
            </div>

            {/* Headline */}
            <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-transparent">
              Write, Save, Share
              <br />
              <span className="text-primary">Your Thoughts</span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-8">
              Transform your ideas into compelling stories. Practice writing
              with our platform, get feedback from the community, and become a
              better writer every day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="hover-lift group">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Start Writing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover-lift"
              >
                <Link href="/articles">Explore Articles</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section background="muted">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4">
              Everything you need to improve your writing
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Our platform provides all the tools and community support you need
              to develop your writing skills.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group hover-lift text-center">
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                <BookOpen className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Daily Practice</h3>
              <p className="text-muted-foreground">
                Get daily writing prompts and challenges to keep your skills
                sharp and creativity flowing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group hover-lift text-center">
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                <Users className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Community Feedback</h3>
              <p className="text-muted-foreground">
                Share your work with other writers and get constructive feedback
                to improve your craft.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group hover-lift text-center">
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Rich Editor</h3>
              <p className="text-muted-foreground">
                Write with our powerful editor that supports formatting, saving
                drafts, and easy sharing.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
