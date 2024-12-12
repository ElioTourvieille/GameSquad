import Header from "./components/Header";
//import Sidebar from './components/sidebar'
//import GameRecommendations from './components/game-recommendations'
//import RecentAlerts from './components/recent-alerts'
//import UpcomingSessions from './components/upcoming-sessions'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-indigo-500 text-white">
      <Header />
      <div className="relative w-full py-8 flex flex-col justify-center items-center lg:flex-row gap-8 z-0 h-[calc(100vh-85px)]">
        <div
          className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[49%] w-full h-[92vh] bg-center -z-10"
          style={{
            backgroundImage: "url('/gaming.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <main className="flex-grow space-y-8">
          <div className="absolute top-32 right-20 text-right">
            <h1 className="text-6xl text-center font-orbitron font-extrabold text-indigo-950 max-w-4xl">
              Organize and share your gaming sessions like never before!
            </h1>
          </div>

          <div className="absolute bottom-40 left-20">
            <p className="text-2xl max-w-xl text-purple-100 drop-shadow-md mb-4">
              Discover your next favorite games recommended by your friends,
              organize your gaming sessions or raids effortlessly, and never
              miss an opportunity to play together. With GameSquad, connect your
              squad and simplify your gaming nights.
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="relative group w-48 h-16 bg-gradient-to-r from-purple-700 to-indigo-600 border-2 border-purple-900 rounded-xl hover:purple-800 hover:scale-95 shadow-lg transition">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75"></span>
              <span className="relative text-white text-2xl font-extrabold drop-shadow-lg">
                START
              </span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
