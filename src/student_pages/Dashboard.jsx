import React, { useState, useEffect } from 'react';
import "../index.css";
import Navbar from '../components/General/Navbar';
import icon from '../components/icon/dashboard.png';
import { BASE_API_URL } from '../global.js';
import axios from 'axios';

const SDashboard = () => {
    const [upcoming, setupcoming] = useState([]);
    const [state, setState] = useState({
        id_student: 0, // Initialize with the appropriate default value
    });

    useEffect(() => {
        const fetchupcoming = async () => {
            try {
                // Get token from sessionStorage
                const token = sessionStorage.getItem('tokeen')

                // Make GET request to /teacher/getteacher with Authorization header
                const response = await axios.get(`${BASE_API_URL}/dashboard/upcomingonline${state.id_student}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Set upcoming state with the received data
                setupcoming(response.data.data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchupcoming();
    }, []);

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="">
                <Navbar />

                <div className="float-right mt-8 ">
                    {/* Show image only on desktop (md and larger screens) */}
                    <img src={icon} className="mr-11 hidden md:block" alt="Icon" />
                </div>

                <div className="overflow-x-auto  pt-14 font-poppins ">
                    <div className=" text-left ml-11 mr-11">

                        <span className="text-red-700 text-sm font-medium font-Poppins leading-normal">CURHApps</span>
                        <span className="text-black text-xs font-normal font-Poppins leading-normal">, </span>
                        <span className="text-black text-sm font-normal font-Poppins leading-normal">
                            a counseling service both offline and online at SMK Telkom Malang,<br />
                            aims to provide guidance and counseling support to students through the collaboration<br />
                            with counseling upcoming, the students' trusted companions. Please be on time.
                        </span>
                    </div>
                    <div className="ml-11 mr-11 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <a href="#" className="max-w-sm block">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                        Upcoming Appointment
                                    </h5>
                                    <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                        4 December 2023 - 13.00
                                    </p>
                                    <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                        John Doe, S.Psi.
                                    </p>
                                    <button
                                        type="button"
                                        className=" ml-40 mx-auto mt-2 text-orange-700 hover:text-white border border-orange-400 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb- dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                                    >
                                        waiting
                                    </button>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="max-w-sm block">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                        Last Counseling
                                    </h5>
                                    <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                        23 December 2023 - 09.00
                                    </p>
                                    <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                        Jessica Rahma, S.Psi.
                                    </p>
                                    <button
                                        type="button"
                                        className="ml-44 mx-auto mt-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb- dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    >
                                        review
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>







                </div>
            </div>
            {/* <div className="text-center mt-4 text-xs font-normal text-gray-500 font-Poppins">
                © {new Date().getFullYear()} Copyright CURHApps All Rights Reserved.
            </div> */}
        </div>
    );
}

export default SDashboard;
