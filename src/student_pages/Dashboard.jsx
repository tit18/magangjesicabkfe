import React, { useState, useEffect } from 'react';
import "../index.css";
import Navbar from '../components/General/Navbar';
import icon from '../components/icon/dashboard.png';
import { BASE_API_URL } from '../global.js';
import axios from 'axios';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const SDashboard = () => {
    const [upcoming, setupcoming] = useState(null);
    const [last, setLast] = useState(null);
    const navigate = useNavigate();


    const fetchupcoming = async () => {
        try {
            const token = sessionStorage.getItem('tokeen')
            const response = await axios.get(`${BASE_API_URL}/dashboard/upcomingonline`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // console.log(response.data.data); // Log the response data

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

            // console.log(response.data.data); // Log the response data

            setLast(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };


    useEffect(() => {
        fetchupcoming();
        fetchlast();
    }, []);

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDateTime = momentDate.format('DD/MM/YYYY HH:mm:ss');
        return { formattedDateTime };
    };

    

    const handleReview= () => {
        // Navigasi ke halaman "/counseling" saat tombol diklik
        navigate('/history');
        
    }

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
                            <a key={upcoming.id}  className="max-w-sm block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4">
                                        <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                            Upcoming Appointment
                                        </h5>
                                        <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                            {formatDate(upcoming.meeting_date).formattedDateTime}
                                        </p>
                                        <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                            {upcoming.teacher_name}
                                        </p>
                                        <b
                                            type="button"
                                            className="ml-40 mx-auto mt-2    focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb- d text-white bg-orange-600 dark:focus:ring-orange-900"
                                        >
                                            {upcoming?.aproval === "1" ? "Approved" : upcoming?.aproval === "0" ? "Not Approved" : "Waiting"}
                                        </b>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <p className="ml-11 mr-11 mt-4 text-base font-normal text-gray-700 dark:text-black-400" >
                                No upcoming appointments.
                            </p>
                        )}

                        {last ? (
                            <a className="max-w-sm block">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4">
                                        <h5 className="text-1xl font-bold tracking-tight text-red-600">
                                            Last Counseling
                                        </h5>
                                        <p className="mt-2 text-base font-normal text-gray-700 dark:text-black-400">
                                            {formatDate(last.meeting_date).formattedDateTime}
                                        </p>
                                        <p className="text-base font-normal text-gray-700 dark:text-black-400">
                                            {last.teacher_name}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleReview}
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
