import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-5 p-6 rounded-xl shadow-inner bg-[#151524] border border-[#2d2d45] hover:shadow-lg transition duration-300 ease-in-out">
      <div className={`w-14 h-14 flex items-center justify-center text-white text-2xl rounded-full ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h6 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">{label}</h6>
        <span className="text-xl font-bold text-white">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
