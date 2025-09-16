import Description from "@/components/features/articles/Description";
import Workspace from "./workspace";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Workspace description={<Description statementId={id} />} id={id} />;
}
