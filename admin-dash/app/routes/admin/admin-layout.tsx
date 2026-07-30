import React from "react";
import  { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems } from "../../../components";
import MobileSidebar from "../../../components/MobileSidebar";
import { account } from "~/appwrite/client";
import { getExistingUserData, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();

        if (!user?.$id) {
            throw redirect('/sign-in');
        }

        const existingUser = await getExistingUserData(user.$id);
        if (existingUser?.status === 'user') {
            throw redirect('/');
        }

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.error('Error fetching user', e);
        throw redirect('/sign-in');
    }
}

const AdminLayout = () => {
  return (
     <div className="admin-layout">
            <MobileSidebar />

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
