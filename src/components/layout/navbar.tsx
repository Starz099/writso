"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { PenTool, User, LogOut, Settings, Menu } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { data: session } = useSession();

  const navLinks = (
    <>
      <Link
        href="/articles"
        className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Articles
      </Link>
      {session && (
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                  <PenTool className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold tracking-tight">Writso</span>
              </Link>
            </motion.div>

            <nav className="hidden items-center gap-6 md:flex">{navLinks}</nav>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full p-0"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={session.user?.image || ""}
                          alt={session.user?.name || ""}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {session.user?.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/articles/my_submissions"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      My Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => signIn()} variant="default" size="sm">
                Sign In
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 py-6">
                  <Link href="/" className="flex items-center gap-2">
                    <PenTool className="h-5 w-5" />
                    <span className="text-lg font-bold">Writso</span>
                  </Link>
                  <nav className="flex flex-col gap-4">{navLinks}</nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </motion.header>
  );
};

export default Navbar;
