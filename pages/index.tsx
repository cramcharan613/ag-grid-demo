
import { useState } from "react";
import Link from "next/link";
import Grid from "../components/Grid";
import { HiMenu, HiX } from "react-icons/hi";
import {
  HiHome,
  HiChartBar,
  HiUsers,
  HiCog,
  HiSupport,
  HiDocumentReport,
  HiBell,
  HiUserCircle
} from "react-icons/hi";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const menuItems = [
    { icon: HiHome, label: "Dashboard", href: "/" },
    { icon: HiChartBar, label: "Analytics", href: "/analytics" },
    { icon: HiUsers, label: "Participants", href: "/participants" },
    { icon: HiDocumentReport, label: "Reports", href: "/reports" },
    { icon: HiCog, label: "Settings", href: "/settings" },
    { icon: HiSupport, label: "Support", href: "/support" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Sidebar */}
      <div className={`fixed md:static bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-r border-gray-200 ${isSidebarCollapsed ? 'w-20' : 'w-64'} space-y-8 py-8 px-4 min-h-screen shadow-lg transition-all duration-300 ease-in-out rounded-r-lg ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="flex items-center justify-between px-4">
          <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-400 hover:from-purple-900 hover:to-pink-800 transition-colors duration-200 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            Cetera Financial Group
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-800 hover:text-gray-900 transition-colors duration-200">
            <HiX className="w-8 h-8" />
          </button>
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:block text-gray-800 hover:text-gray-900 transition-colors duration-200">
            {isSidebarCollapsed ? <HiMenu className="w-8 h-8" /> : <HiX className="w-8 h-8" />}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:bg-purple-200 hover:text-purple-900 rounded-lg transition-all duration-200 group"
            >
              <item.icon className={`transition-transform duration-200 ${isSidebarCollapsed ? 'w-10 h-10' : 'w-7 h-7'} group-hover:scale-110`} />
              <span className={`font-medium ${isSidebarCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 rounded-l-lg">
        {/* Top Navigation */}
        <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-200 px-4 py-2 sticky top-0 z-10 shadow-sm rounded-b-lg">
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-200 transition-colors duration-200"
            >
              <HiMenu className="w-8 h-8 text-gray-800" />
            </button>
            <button className="p-2 rounded-lg hover:bg-purple-200 transition-colors duration-200 relative">
              <HiBell className="w-8 h-8 text-gray-800" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-200 transition-colors duration-200">
              <HiUserCircle className="w-8 h-8 text-gray-800" />
              <span className="text-sm font-medium text-gray-900">Abbey</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Grid />
        </main>
      </div>
    </div>
  );
};

export default Home;
