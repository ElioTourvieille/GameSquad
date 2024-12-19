import UserHeader from "../../components/UserHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
    <UserHeader />
      {children}
    </div>
  );
}