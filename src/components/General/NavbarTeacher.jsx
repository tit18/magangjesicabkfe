import React, { useState, useEffect } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import "../../index.css";
import { BASE_IMAGE_URL } from "../../global";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem('tokeen')); // Assuming tokeen is the token property

    const [teacherInfo, setTeacherInfo] = useState({
        idTeacher: '',
        teacherName: '',
        photo: '',
    });

    useEffect(() => {
        const storedTeacherInfo = sessionStorage.getItem('teacher');
        if (storedTeacherInfo) {
            const { id_teacher, teacher_name, photo } = JSON.parse(storedTeacherInfo).data;
            setTeacherInfo({
                idTeacher: id_teacher,
                teacherName: teacher_name,
                photo,
            });
        }
    }, []);

    const navItems = [
        { path: "/teacher/dashboard", label: "Dashboard" },
        { path: "/teacher/appointment", label: "Appointment" },
        { path: "/teacher/counseling", label: "Counseling" },
        { path: "/teacher/history", label: "History" },
    ];

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/teacher");
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const isCounselingPage = location.pathname.includes("/teacher/counseling");

    useEffect(() => {
        const newToken = sessionStorage.getItem('tokeen');
        setToken(newToken);
        if (!newToken || newToken !== token) {
            handleLogout();
        }
    }, [token]);

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
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                            </svg>
                            <svg
                                className={`hidden h-6 w-6 ${isNavOpen ? "block" : "hidden"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
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
                                        className={`${location.pathname === item.path || (isCounselingPage && item.path === "/teacher/counseling")
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
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className={`hidden sm:block ${isNavOpen ? "hidden" : ""}`}>
                                {/* Tambahkan style={{ textTransform: 'uppercase' }} untuk membuat huruf kapital */}
                                <span className="font-semibold" style={{ textTransform: 'capitalize' }}>{teacherInfo.teacherName}</span>
                            </div>

                            <div className="relative ml-3">
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={toggleProfileDropdown}
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    {teacherInfo.photo ? (
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={`${BASE_IMAGE_URL}/${teacherInfo.photo}`}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
                                    )}
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer px-4 py-2" onClick={handleLogout}>
                                        Sign out
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
                            className={`${location.pathname === item.path || (isCounselingPage && item.path === "/teacher/counseling")
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
