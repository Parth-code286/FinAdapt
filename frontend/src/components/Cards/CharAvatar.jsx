import React from "react";
import { getInitials } from "../../utils/helper";

// Get initials from full name
const UserAvatar = ({
  fullname = "User",
  imageUrl = "",
  width = "w-16",
  height = "h-16",
  style = "",
}) => {
  const initials = getInitials(fullname);

  return (
    <div
      className={`${width} ${height} ${style} rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xl font-semibold`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={fullname}
          className="w-full h-full object-cover"
          onError={(e) => {
            // fallback to initials on broken image
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentElement.textContent = initials;
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default UserAvatar;
