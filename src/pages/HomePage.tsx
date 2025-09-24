import Lottie from "lottie-react";
import bgImg from "@/assets/images/background.jpg";
import fireAnimation from "@/assets/lotties/Fire.json";
import { Home, Settings } from "lucide-react";
import HabitList from "@/components/HabitList";

export default function HomePage() {
  return (
    <div className="relative mx-auto flex h-screen max-w-md flex-col bg-amber-300">
      <div className="flex min-h-1/2 items-center justify-end px-4 text-amber-50">
        <div className="text-right text-xl">
          Welcome back, <span className="text-2xl">Mr. Wee</span>
          <p className="mt-2 text-xs">
            You're such a lazy dog, there're 2/5 habits that need to be done!!
            🌚
          </p>
        </div>
      </div>
      <div
        className="relative flex-1 rounded-t-[75px] bg-cover bg-center bg-no-repeat py-5"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 rounded-t-[75px] bg-amber-200/70"></div>
        <div className="px-8">
          <div className="relative flex items-center rounded-[75px] bg-amber-300/80 px-4 text-amber-50 shadow">
            <div className="flex w-fit items-center">
              <Lottie
                animationData={fireAnimation}
                className="mr-2 mb-3 w-10"
              />
              <span className="text-xl font-semibold text-amber-700">216</span>
            </div>
            <p className="ml-4">🌚: Dunno what the fuck to say</p>
          </div>
        </div>
        <HabitList />
      </div>
      <div className="fixed right-1/2 bottom-10 flex h-16 translate-x-1/2 items-center justify-center gap-4 rounded-full bg-amber-300 px-4 shadow-xl">
        <button className="flex aspect-square w-16 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-gray-200/60">
          <Home />
        </button>
        <button className="aspect-square w-22 rounded-full bg-amber-800 text-[42px] font-bold text-white transition-transform duration-150 hover:scale-105">
          +
        </button>
        <button className="flex aspect-square w-16 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-gray-200/60">
          <Settings />
        </button>
      </div>
    </div>
  );
}
