// Note: For types that directly map to your database, prefer importing
// the generated types from Prisma, like `import type { Article } from '@prisma/client';`
// These interfaces are useful for defining custom object shapes, API responses, etc.

export interface Article {
  id: string;
  title: string;
  content: string;
  userId: string;
  statementId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleStatement {
  id: string;
  title: string;
  prompt: string;
  articles?: Article[];
  createdAt: Date;
}

export interface CreateArticleResponse {
  message: string;
  id: string;
}
