import { ReactNode } from "react";

// Common component prop types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface ContainerProps extends BaseComponentProps {
  size?: "default" | "narrow" | "wide";
}

export interface SectionProps extends BaseComponentProps {
  size?: "sm" | "default" | "lg" | "xl";
  background?: "default" | "muted" | "accent";
}

// Layout component props
export interface LayoutProps {
  children: ReactNode;
}

// Feature component props
export interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    content: string;
    score: number;
    createdAt: Date;
  };
  showActions?: boolean;
}
