import UserHeader from "../../components/UserHeader";

export default function DashboardLayout({
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