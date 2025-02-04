import { useState } from "react";
import Link from "next/link";
import Grid from "../components/Grid";
import { HiMenu, HiX } from "react-icons/hi";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-xl font-bold px-4">Sidebar</div>
        <nav>
          <Link href="/" className="block py-2.5 px-4 hover:bg-gray-700">
            Home
          </Link>
          <Link href="/about" className="block py-2.5 px-4 hover:bg-gray-700">
            About
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="max-w-[1200px] mx-auto">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="mb-5 p-2 bg-gray-800 text-white rounded-md flex items-center gap-2"
          >
            {isSidebarOpen ? (
              <>
                <HiX className="w-5 h-5" />
              </>
            ) : (
              <>
                <HiMenu className="w-5 h-5" />
              </>
            )}
          </button>


          <Grid />
        </div>
      </div>
    </div>
  );
};

export default Home;