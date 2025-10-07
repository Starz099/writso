"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, BookOpen, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main>
      {/* Hero Section */}
      <Section size="xl" className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-10 opacity-50"
        >
          <div className="from-primary/10 absolute top-0 left-0 h-full w-full bg-gradient-to-br to-transparent" />
          <div className="from-secondary/10 absolute right-0 bottom-0 h-full w-full bg-gradient-to-tl to-transparent" />
        </motion.div>

        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="bg-primary/10 text-primary mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Sharpen your writing skills
            </div>

            <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-br bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl">
              Write, Share, and Grow
            </h1>

            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-8">
              Join a community of writers dedicated to improving their craft.
              Get feedback, practice daily, and see your skills flourish.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Start Writing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/articles">Explore Articles</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section background="muted">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="mb-16 text-center"
          >
            <motion.h2
              variants={featureVariants}
              className="text-4xl font-bold tracking-tighter"
            >
              Elevate Your Writing
            </motion.h2>
            <motion.p
              variants={featureVariants}
              className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg"
            >
              Our platform is packed with features to help you become a better
              writer.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid gap-8 md:grid-cols-3"
          >
            <motion.div
              variants={featureVariants}
              className="hover-lift group bg-card shadow-soft rounded-xl border p-8 text-center"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                <BookOpen className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Daily Prompts</h3>
              <p className="text-muted-foreground">
                Never run out of ideas. Get daily prompts to spark your
                creativity and build a consistent writing habit.
              </p>
            </motion.div>

            <motion.div
              variants={featureVariants}
              className="hover-lift group bg-card shadow-soft rounded-xl border p-8 text-center"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                <Users className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Peer Feedback</h3>
              <p className="text-muted-foreground">
                Share your work with a supportive community and receive valuable
                feedback to refine your writing.
              </p>
            </motion.div>

            <motion.div
              variants={featureVariants}
              className="hover-lift group bg-card shadow-soft rounded-xl border p-8 text-center"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Advanced Editor</h3>
              <p className="text-muted-foreground">
                Our feature-rich editor helps you focus on writing, with tools
                for formatting, tracking progress, and more.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="from-primary to-secondary shadow-medium rounded-2xl bg-gradient-to-r p-12"
          >
            <h2 className="text-primary-foreground text-4xl font-bold tracking-tighter">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl text-lg">
              Sign up today and take the next step in your writing career. It is
              free to get started!
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-primary-foreground text-primary mt-8"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                Join Now <MoveRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
