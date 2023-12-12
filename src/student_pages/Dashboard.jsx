import React from "react";
import "../index.css";
import Navbar from '../components/General/Navbar';

const SDashboard = () => {

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="">
                <Navbar />
                <div className="overflow-x-auto  pt-14 font-poppins ">
                    <div className=" text-left">

                        <span className="text-red-700 text-sm font-medium font-Poppins leading-normal">CURHApps</span>
                        <span className="text-black text-xs font-normal font-Poppins leading-normal">, </span>
                        <span className="text-black text-sm font-normal font-Poppins leading-normal">
                            a counseling service both offline and online at SMK Telkom Malang,<br />
                            aims to provide guidance and counseling support to students through the collaboration<br />
                            with counseling teachers, the students' trusted companions. Please be on time.
                        </span>
                    </div>
                    <div className="overflow-x-auto pt-14 font-poppins">
                        <a href="#" className="max-w-sm block ml-6">
                            <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h5 className="text-2xl font-bold tracking-tight text-red-600">
                                        Upcoming Appointment
                                    </h5>
                                    <p className="mt-2 text-base font-normal text-gray-700 dark:text-gray-400">
                                        4 December 2023 - 13.00
                                    </p>
                                    <p className="mt-2 text-base font-normal text-gray-700 dark:text-gray-400">
                                        John Doe, S.Psi.
                                    </p>
                                    <button className="text-white bg-orange-500">
                                        red
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>



                </div>
            </div>
            <div className="text-center mt-4 text-xs font-normal text-gray-500 font-Poppins">
                © {new Date().getFullYear()} Copyright CURHApps All Rights Reserved.
            </div>
        </div>
    );
}

export default SDashboard;
