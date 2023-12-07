import React, { useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import "../../index.css";
import icon from '../icon/profile.png';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navItems = [
        { path: "/teacher/dashboard", label: "Dashboard" },
        { path: "/teacher/appointment", label: "Appointment" },
        { path: "/teacher/counseling", label: "Counseling" },
        { path: "/teacher/history", label: "History" },
    ];

    if (sessionStorage.getItem('teacher_logged') !== "true") {
        return <Navigate to="/teacher" state={{ from: location }} replace />
    }

    const Logout = () => {
        sessionStorage.clear()
        navigate("/teacher")
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const isCounselingPage = location.pathname.includes("/teacher/counseling");

    return (
        <nav className="w-full top-0 flex px-5 py-3 justify-between items-center shadow-lg bg-white fixed z-10">
            <h1 className="text-[#B72024] font-bold text-xl font-poppins">CURHApps</h1>

            {/* Hamburger Menu */}
            <div className="flex flex-col items-center justify-center lg:hidden cursor-pointer" onClick={toggleNav}>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </div>

            {/* Navbar Links */}
            <ul className={`lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-5
                ${isNavOpen ? "flex flex-col items-start justify-start" : "hidden lg:flex"}`}
            >
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        className={`text-center font-poppins ${location.pathname === item.path || (isCounselingPage && item.path === "/teacher/counseling") ? "font-bold" : ""}`}
                    >
                        <Link to={item.path} onClick={toggleNav}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Profile Icon */}
            <div className="relative">
                <img src={icon} alt="profile" width={40} className="cursor-pointer" onClick={toggleProfileDropdown} />
                {isProfileDropdownOpen && (
                    <div className="absolute top-10 right-0 z-10 bg-white border border-gray-300 rounded-md shadow-md">
                        <button className="block w-full text-left p-2 hover:bg-gray-100" onClick={Logout}>
                            Logout
                        </button>
                        {/* Tambahkan link atau fungsi lainnya sesuai kebutuhan */}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
