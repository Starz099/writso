"use client";
import { getAllArticleStatements } from "@/lib/api";
import { ArticleStatement } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  const [statements, setStatements] = useState<ArticleStatement[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllArticleStatements();
        setStatements(result);
      } catch (e) {
        console.error("Client-side error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main>
      <Section size="sm" className="bg-background border-b">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <BookOpen className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Articles</h1>
              <p className="text-muted-foreground mt-1">
                Browse and engage with a variety of writing prompts.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="shadow-soft">
                  <CardHeader>
                    <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted h-4 w-full animate-pulse rounded" />
                    <div className="bg-muted mt-2 h-4 w-5/6 animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !statements || statements.length === 0 ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">No Articles Found</h2>
              <p className="text-muted-foreground mt-2">
                Check back later for more writing opportunities.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {statements.map((item) => (
                <motion.div key={item.id} variants={cardVariants}>
                  <Link href={`/articles/${item.id}`}>
                    <Card className="hover-lift group shadow-soft h-full transition-all duration-200">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {item.prompt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </Section>
    </main>
  );
};

export default Page;
