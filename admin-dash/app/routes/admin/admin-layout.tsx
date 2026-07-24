import React from "react";
import  { Outlet } from "react-router";
import ej2Navigations from "@syncfusion/ej2-react-navigations";
import { NavItems } from "../../../components";

const { SidebarComponent } = ej2Navigations;

const AdminLayout = () => {
  return (
      <div className="admin-layout">
            {/* <MobileSidebar /> */}

            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>

            <aside className="children">
                <Outlet />
            </aside>
        </div>
  );
};

export default AdminLayout;
