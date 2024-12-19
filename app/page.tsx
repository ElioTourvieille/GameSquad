"use client";

import { useConvexAuth } from "convex/react";
import Header from "../components/Header";
import Link from "next/link";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { PageTransition } from "../components/PageTransition";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    redirect("/user");
  }

  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-indigo-500 text-white overflow-hidden flex flex-col">
        {/* Animated background elements */}
        <motion.div
          className="fixed w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [-200, 200, -200],
            y: [-200, 200, -200],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="fixed right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl"
          animate={{
            x: [200, -200, 200],
            y: [200, -200, 200],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="fixed left-1/2 top-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <Header />
        <div className="relative w-full py-8 flex flex-col justify-center items-center lg:flex-row gap-8 z-0 h-[calc(100vh-85px)]">
          <div
            className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[49%] w-full h-[92vh] bg-center -z-10 opacity-50 lg:opacity-100"
            style={{
              backgroundImage: "url('/gaming.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <main className="flex-grow space-y-8 px-4 md:px-8">
            <motion.div 
              className="absolute top-32 right-0 md:right-20 text-center lg:text-right"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-extrabold text-indigo-950 max-w-4xl mx-auto md:mx-0">
                Organize and share your gaming sessions like never before!
              </h1>
            </motion.div>

            <motion.div 
              className="absolute bottom-32 left-4 md:left-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl max-w-xl text-purple-100 drop-shadow-md mb-4">
                Discover your next favorite games recommended by your friends,
                organize your gaming sessions or raids effortlessly, and never
                miss an opportunity to play together. With GameSquad, connect your
                squad and simplify your gaming nights.
              </p>
            </motion.div>

            <Link href="/signin">
              <motion.div 
                className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <button className="relative group w-40 sm:w-52 h-16 sm:h-20 bg-gradient-to-r from-purple-700 to-indigo-600 border-2 border-purple-900 rounded-xl hover:purple-800 hover:scale-95 shadow-lg transition">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75"></span>
                  <span className="relative text-white text-xl sm:text-3xl font-extrabold drop-shadow-lg">
                    START
                  </span>
                </button>
              </motion.div>
            </Link>
          </main>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
