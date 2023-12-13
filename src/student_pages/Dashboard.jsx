import React, { useState, useEffect } from 'react';
import "../index.css";
import Navbar from '../components/General/Navbar';
import icon from '../components/icon/dashboard.png';
import { BASE_API_URL } from '../global.js';
import axios from 'axios';
import moment from 'moment/moment';

const SDashboard = () => {
    const [upcoming, setupcoming] = useState([]);
    const [last, setLast] = useState([]);
    const [teacher, setTeacher] = useState([])

    const fetchupcoming = async () => {
        try {
            const token = sessionStorage.getItem('tokeen')
            const response = await axios.get(`${BASE_API_URL}/dashboard/upcomingonline`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.data); // Log the response data

            setupcoming(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    const fetchlast = async () => {
        try {
            const token = sessionStorage.getItem('tokeen')
            const response = await axios.get(`${BASE_API_URL}/dashboard/last`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.data); // Log the response data

            setLast(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    const fetchteacher = async () => {
        try {
            const token = sessionStorage.getItem('tokeen')
            const response = await axios.get(`${BASE_API_URL}/teacher/getteacher`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.data); // Log the response data

            setTeacher(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    useEffect(() => {
        fetchupcoming();
        fetchlast();
        fetchteacher();
    }, []);

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDateTime = momentDate.format('DD/MM/YYYY HH:mm:ss');
        return { formattedDateTime };
    };


    return (
        <div className="flex flex-col justify-between h-screen">
            <div>
                <Navbar />
                <div className="float-right mt-8 ">
                    <img src={icon} className="mr-11 hidden md:block" alt="Icon" />
                </div>
                <div className="overflow-x-auto  pt-14 font-poppins ">
                    <div className="text-left ml-11 mr-11">
                        <span className="text-red-700 text-sm font-medium font-Poppins leading-normal">CURHApps</span>
                        <span className="text-black text-xs font-normal font-Poppins leading-normal">, </span>
                        <span className="text-black text-sm font-normal font-Poppins leading-normal">
                            a counseling service both offline and online at SMK Telkom Malang,<br />
                            aims to provide guidance and counseling support to students through the collaboration<br />
                            with counseling upcoming, the students' trusted companions. Please be on time.
                        </span>
                    </div>
                    <div className="ml-11 mr-11 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* {upcoming && upcoming.length > 0 ? ( */}

                        {upcoming ? (
                            <a key={upcoming.id} href="/counseling" className="max-w-sm block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4">
                                        <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                            Upcoming Appointment
                                        </h5>
                                        <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                            {formatDate(upcoming.meeting_date).formattedDateTime}
                                        </p>
                                        <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                            {upcoming && upcoming.teacher && upcoming.teacher.teacher_name}
                                        </p>
                                        <button
                                            type="button"
                                            className="ml-40 mx-auto mt-2 text-orange-700 hover:text-white border border-orange-400 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb- dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                                        >
                                            waiting
                                        </button>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <p className="ml-11 mr-11 mt-4 text-base font-normal text-gray-700 dark:text-black-400">
                                No upcoming appointments.
                            </p>
                        )}

                        {last ? (
                            <a href="/history" className="max-w-sm block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4">
                                        <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                            Last Counseling
                                        </h5>
                                        <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                            23 December 2023 - 09.00
                                        </p>
                                        <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                            {last}
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
                        ) : (
                            <p className="ml-11 mr-11 mt-4 text-base font-normal text-gray-700 dark:text-black-400">
                                No Last Counseling
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SDashboard;
