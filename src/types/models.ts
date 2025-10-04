// Note: For types that directly map to your database, prefer importing
// the generated types from Prisma, like `import type { Article } from '@prisma/client';`
// These interfaces are useful for defining custom object shapes, API responses, etc.

import { User } from "@prisma/client";

export interface Article {
  id: string;
  title: string;
  content: string;
  user?: User;
  userId: string;
  statementId?: string | null;
  score: number;
  isPublic: boolean;
  upVotes: number;
  downVotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleStatement {
  id: string;
  title: string;
  prompt: string;
  articles?: Article[];
  upVotes: number;
  downVotes: number;
  createdAt: Date;
}
