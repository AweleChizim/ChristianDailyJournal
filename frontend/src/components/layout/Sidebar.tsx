import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Heart,
    NotebookPen,
    Menu,
    X,
    LogOut,
    Trash2,
} from "lucide-react";

import "./Sidebar.css";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    function closeSidebar() {
        setIsOpen(false);
    }

    return (
        <>
            <button
                className="menu-button"
                onClick={() => setIsOpen(true)}
            >
                <Menu size={28} />
            </button>

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
            >
                <button
                    className="close-button"
                    onClick={closeSidebar}
                >
                    <X size={24} />
                </button>

                <div>
                    <h1 className="sidebar-logo">
                        Christian
                        <br />
                        Daily Journal
                    </h1>

                    <nav>

                        <NavLink
                            to="/dashboard"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/gratitudes"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <Heart size={20} />
                            My Gratitudes
                        </NavLink>

                        <NavLink
                            to="/journal"
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >
                            <NotebookPen size={20} />
                            My Journal
                        </NavLink>

                    </nav>
                </div>

                <div className="sidebar-footer">

                    <button className="logout-btn">
                        Logout
                    </button>

                    <button className="delete-btn">
                        Delete Account
                    </button>

                </div>

            </aside>
        </>
    );
}