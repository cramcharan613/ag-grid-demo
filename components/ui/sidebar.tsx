import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
      </div>
      <nav className="mt-5">
        <ul>
          <li className="p-2 hover:bg-gray-700">
            <a href="#">Dashboard</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="#">Users</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="#">Settings</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="#">Reports</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
