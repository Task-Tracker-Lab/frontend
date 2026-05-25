export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { projectId } = await params;
  const { token } = await searchParams;

  return (
    <div>
      <div>Проект: {projectId}</div>
      <div>Токен: {token}</div>
    </div>
  );
}
