import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../index.css";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/appointment", label: "Appointment" },
    { path: "/counseling", label: "Counseling" },
    { path: "/history", label: "History" },
  ];

  return (
    <nav className="w-full flex px-5 py-3 justify-between items-center shadow-lg bg-white">
      <h1 className="text-[#B72024] font-bold text-xl font-poppins">CURHApps</h1>
      <ul className="flex items-center justify-center gap-5">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`text-center font-poppins ${
              location.pathname === item.path ? "font-bold" : ""
            }`}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <img src="profile.png" alt="profile" width={40} />
    </nav>
  );
};

export default Navbar;