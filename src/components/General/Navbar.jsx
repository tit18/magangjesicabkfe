import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { BASE_IMAGE_URL } from "../../global";
import "../../index.css";

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profilePhotoUrl = `${BASE_IMAGE_URL}/${sessionStorage.getItem('photo')}`

    if (sessionStorage.getItem('student_logged') !== "true") {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    const Logout = () => {
        sessionStorage.clear()
        navigate("/")
    }

    const navItems = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/appointment", label: "Appointment" },
        { path: "/counseling", label: "Counseling" },
        { path: "/history", label: "History" },
    ];

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const isCounselingPage = location.pathname.includes("/counseling");

    return (
        <nav className="bg-white drop-shadow-md">
            <div className="mx-auto w-full px-6">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-[#B72024] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                            onClick={toggleNav}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`block h-6 w-6 ${isNavOpen ? "hidden" : "block"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                            </svg>
                            <svg
                                className={`hidden h-6 w-6 ${isNavOpen ? "block" : "hidden"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between md:justify-between lg:justify-between">
                        <div className="items-center">
                            <h1 className="text-[#B72024] font-bold text-xl font-poppins">CURHApps</h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={`${location.pathname === item.path || (isCounselingPage && item.path === "/counseling")
                                            ? "font-bold text-black"
                                            : "text-black hover:text-black"
                                            } rounded-md px-3 py-2 text-sm `}
                                        onClick={toggleNav}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="relative ml-3">
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={toggleProfileDropdown}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={profilePhotoUrl}
                                        alt=""
                                    />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <button className="block px-4 py-2 text-sm text-black" role="menuitem" tabIndex="-1" onClick={Logout}>
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className={`sm:hidden ${isNavOpen ? "block" : "hidden"}`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`${location.pathname === item.path || (isCounselingPage && item.path === "/counseling")
                                ? "bg-[#B72024] text-white"
                                : "text-black hover:bg-gray-500 hover:text-white"
                                } block rounded-md px-3 py-2 text-base font-medium`}
                            onClick={toggleNav}
                            aria-current={location.pathname === item.path ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
