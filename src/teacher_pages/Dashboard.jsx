// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import icon from '../components/icon/dashboard.png';
import NavbarTeacher from '../components/General/NavbarTeacher';
import '../index.css';
import { BASE_API_URL } from '../global';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TDashboard = () => {
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState([]);
    const [online, setOnline] = useState([]);
    const [state] = useState({
        id_teacher: 0, // Initialize with the appropriate default value
    });

    const fetchCountoffline = async () => {
        try {
            // Get token from sessionStorage
            const token = sessionStorage.getItem('tokeen');

            // Make GET request to /dashboard/countoffline with Authorization header
            const response = await axios.get(`${BASE_API_URL}/dashboard/countoffline`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set upcoming state with the received data
            setUpcoming(response.data.data_count);
        } catch (error) {
            console.error('Error fetching upcoming data:', error);
        }
    };

    useEffect(() => {
        // Fetch upcoming data when the component mounts
        fetchCountoffline();
    }, [state.id_teacher]);

    const fetchCountonline = async () => {
        try {
            // Get token from sessionStorage
            const token = sessionStorage.getItem('tokeen');

            // Make GET request to /dashboard/countoffline with Authorization header
            const response = await axios.get(`${BASE_API_URL}/dashboard/countonline`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Set upcoming state with the received data
            setOnline(response.data.data_count);
        } catch (error) {
            console.error('Error fetching upcoming data:', error);
        }
    };

    useEffect(() => {
        // Fetch upcoming data when the component mounts
        fetchCountonline();
    }, [state.id_teacher]);

    const handleOfflineClick = () => {
        // Navigasi ke halaman "/counseling" saat tombol diklik
        navigate('/teacher/appointment');
    };

    const handleOnlineClick = () => {
        // Navigasi ke halaman "/counseling" saat tombol diklik
        navigate('/teacher/counseling');
    };

    return (
        <div className="w-full overflow-hidden">
            <NavbarTeacher /> {/* Include the Navbar component */}
            <div className="float-right mt-8 ">
                {/* Show image only on desktop (md and larger screens) */}
                <img src={icon} className="mr-11 hidden md:block xl:w-[600px] lg:w-[550px] md:w-[400px]" alt="Icon" />
            </div>

            <div className="overflow-x-auto pt-14 font-poppins ">
                <div className=" text-left ml-11 mr-11">
                    <span className="text-[#B72024] text-sm font-bold font-poppins leading-normal">CURHApps</span>
                    <span className="text-black text-xs font-normal font-poppins leading-normal">, </span>
                    <span className="text-black text-sm font-poppins leading-normal font-semibold">
                        a counseling service both offline and online at SMK Telkom Malang,
                        aims to provide guidance and counseling support to students through the collaboration
                        with counseling teachers, the students' trusted companions. Please be on time.
                    </span>
                </div>
                <div className="ml-11 mr-11 py-1 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="max-w-sm block">
                        <div className="bg-white min-h-[150px] drop-shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h5 className="text-1xl font-bold tracking-tight text-[#B72024]">
                                    Offline Appointment Request
                                </h5>
                                <p className="mt-2 text-base font-semibold text-gray-700 dark:text-black-400">
                                    {upcoming} Appointment Request need to be followed Up
                                </p>
                                <div>
                                    <button className='absolute bottom-0 right-0 mb-4 mr-4 px-3 py-1 h-fit rounded-md bg-[#B72024] text-white' onClick={handleOfflineClick}>Open</button>
                                </div>
                                {/* Add your logic for rendering other details */}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm block">
                        <div className="bg-white min-h-[150px] drop-shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h5 className="text-1xl font-bold tracking-tight text-[#B72024]">
                                    Online Counseling Request
                                </h5>
                                <p className="mt-2 text-base font-semibold text-gray-700 dark:text-black-400">
                                    {online} Stundents are in chat room
                                </p>
                                <div className=''>
                                    <button className='absolute bottom-0 right-0 mb-4 mr-4 px-3 py-1 h-fit rounded-md bg-[#B72024] text-white' onClick={handleOnlineClick}>Open</button>
                                </div>
                                {/* Add your logic for rendering other details */}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Add another section for Last Counseling or any other data you want to display */}
            </div>
        </div>
    );
}

export default TDashboard;
