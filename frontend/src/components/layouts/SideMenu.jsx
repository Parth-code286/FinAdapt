import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

return (
    <aside className="w-64 h-[calc(100vh-61px)] bg-gradient-to-b from-[#181824] to-[#23233a] border-r border-[#23233a] text-gray-100 p-4 overflow-y-auto shadow-xl flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        {user?.profileImageUrl?.trim() ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-purple-600 shadow-lg object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullname}
            width="w-16"
            height="h-16"
            style="text-xl font-semibold text-white border-2 border-purple-600 shadow-md bg-purple-800"
          />
        )}
        <h5 className="mt-3 text-lg font-semibold tracking-wide text-white">{user?.fullname}</h5>
        <span className="text-xs text-gray-400">{user?.email}</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-1">
        {SIDE_MENU_DATA.map((item, idx) => (
          <button
            key={`menu_${idx}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 text-sm px-4 py-3 rounded-lg transition-all duration-200 font-medium group
              ${
                activeMenu === item.label
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#28284a] hover:text-white hover:shadow-md"
              }
            `}
            style={{ outline: "none" }}
          >
            <item.icon
              className={`text-xl transition-transform duration-200 group-hover:scale-110 ${
                activeMenu === item.label ? "text-white" : "text-purple-400 group-hover:text-white"
              }`}
            />
            <span className="truncate">{item.label}</span>
            {item.premium && (
              <span className="ml-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-xs px-2 py-0.5 rounded font-semibold text-gray-900 shadow">
                Premium
              </span>
            )}
          </button>
        ))}
      </nav>
      {/* Optional: Add a logout button at the bottom */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-sm px-4 py-3 rounded-lg transition-all duration-200 text-red-400 hover:bg-[#2d2d44] hover:text-red-300 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;