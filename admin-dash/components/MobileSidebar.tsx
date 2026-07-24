// @ts-nocheck

import {Link} from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import NavItems from "./NavItems";

const MobileSidebar = () => {
    let sidebar: SidebarComponent;

    const toggleSidebar = () => {
        sidebar.toggle()
    }

    return (
        <div className="mobile-sidebar wrapper">
            <header>
                <Link to="/">
                    <img
                        src="/assets/icons/logo.svg"
                        alt="Logo"
                        className="size-[30px]"
                    />

                    <h1>Tourvisto</h1>
                </Link>

                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>
            </header>

            <SidebarComponent
                width={270}
                ref={(Sidebar) => sidebar = Sidebar} // get a reference to the sidebar component and assign it to the sidebar variable for later use
                created={() => sidebar.hide()}
                closeOnDocumentClick={true} // Close the sidebar when clicking outside of it
                showBackdrop={true} // Show a backdrop when the sidebar is open
                type="over" // to show the sidebar over the main content
            >
                <NavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    )
}
export default MobileSidebar