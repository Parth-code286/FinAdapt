import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const NavBar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between gap-5 px-4 py-3 bg-[#1E1E2F] border-b border-[#2A2A40] text-gray-100">
      <button
        className="block lg:hidden text-gray-100"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-semibold tracking-wide">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 z-50 w-64 bg-[#2D2D44] shadow-lg lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default NavBar;