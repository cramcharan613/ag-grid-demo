import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Profile
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
