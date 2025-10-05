import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "../../components/layouts/NavBar";
import SideMenu from "../../components/layouts/SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;