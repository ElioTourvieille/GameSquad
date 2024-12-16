import Sidebar from "@/components/Sidebar";


export default function User() {
  return (
    <div className="min-h-screen w-full bg-indigo-500 text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <main className="flex-grow space-y-8">
          {/* <ProfileSection />
          <StatsSection />
          <ActivitySection /> */}
        </main>
        <aside className="w-full lg:w-80 space-y-6">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
