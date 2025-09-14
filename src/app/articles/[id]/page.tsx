import Description from "@/app/_components/Description/Description";
import Workspace from "./workspace";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <Workspace
      description={<Description statementId={params.id} />}
      id={params.id}
    />
  );
}