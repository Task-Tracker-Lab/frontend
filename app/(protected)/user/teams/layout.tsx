export default function Layout({
  children,
  invitations,
}: {
  children: React.ReactNode;
  invitations: React.ReactNode;
}) {
  return (
    <>
      {children}
      {invitations}
    </>
  );
}
