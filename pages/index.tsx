import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight

import { useState } from "react";
import Link from "next/link";
import Grid from "../components/Grid";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
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
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="mb-5 p-2 bg-gray-800 text-white rounded-md"
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        <div className="mb-5 font-semibold text-blue-700 hover:text-blue-400">
          <a target="_blank" href="https://github.com/owolfdev/ag-grid-demo">
            Github Repo
          </a>
        </div>
        <Grid />
      </div>
    </div>
  );
};

export default Home;
