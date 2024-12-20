import UserHeader from "../../components/UserHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "GameSquad - Dashboard",
  description: "Votre plateforme de partage de jeux vidéo",
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