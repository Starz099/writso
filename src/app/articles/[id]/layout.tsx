import { ReactNode } from "react";

interface ArticleLayoutProps {
  children: ReactNode;
}

const ArticleLayout = ({ children }: ArticleLayoutProps) => {
  return <div>{children}</div>;
};

export default ArticleLayout;