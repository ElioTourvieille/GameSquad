import UserHeader from "../../components/UserHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GameSquad - Dashboard",
  description: "Your gaming companion",
};

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