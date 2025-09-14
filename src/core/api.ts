import axios from "axios";
import { Article, ArticleStatement, CreateArticleResponse } from "@/types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDailyStatement = async (): Promise<ArticleStatement | null> => {
  try {
    const response = await apiClient.get<ArticleStatement>("/api/daily");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch daily statement:", error);
    return null;
  }
};

export const getArticleStatement = async (
  id: string,
): Promise<ArticleStatement | null> => {
  try {
    const response = await apiClient.get<ArticleStatement>(
      `/api/article_statement/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article statement:", error);
    return null;
  }
};

export const getArticles = async (): Promise<Article[] | null> => {
  try {
    const response = await apiClient.get<{ articles: Article[] }>(
      "/api/article",
    );
    return response.data.articles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return null;
  }
};

export const createArticle = async (
  title: string,
  content: string,
  statementId: string,
  userEmail: string,
): Promise<CreateArticleResponse | null> => {
  try {
    const response = await apiClient.post<CreateArticleResponse>(
      `/api/article/${statementId}`,
      {
        title,
        content,
        userEmail,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create article:", error);
    return null;
  }
};

export const getSubmissionById = async (
  submissionId: string,
): Promise<Article | null> => {
  try {
    const response = await apiClient.get<Article>(
      `/api/submission/${submissionId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create article:", error);
    return null;
  }
};
