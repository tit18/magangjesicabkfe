import React, { useState, useEffect } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/General/Navbar";
import profileS from '../components/icon/profile-student.png';
import axios from "axios";
import { BASE_API_URL } from '../global.js';

const SCounseling = () => {
    const [teachers, setTeachers] = useState([]);
    const [tcounseling, setTcounseling] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                // Ganti dengan URL API sesuai kebutuhan Anda
                const token = sessionStorage.getItem('tokeen')

                const response = await axios.get(`${BASE_API_URL}/teacher/getteacher`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTcounseling(response.data.data);
                setLoading(false);

                // Set teachers state dengan data yang diterima dari API
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        // Panggil fungsi untuk mengambil data guru
        fetchTeachers();
    }, []);

    console.log('data teacher', teachers)
    console.log('id', teachers.id_teacher)
    console.log('porfile', tcounseling)

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <div>
                <Navbar />
            </div>
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-28 gap-4 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins">CURHApps Online Counseling</h1>
                    <p className="text-base font-poppins text-center">
                        Here is a list of teachers available for online counseling; please choose one.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
                        {tcounseling.map(teachers => (
                            <div key={teachers.id_teacher} className="bg-white flex p-4 rounded drop-shadow-lg relative">
                                <div className="absolute top-[-30px] right-[-30px] p-2">


                                </div>
                                <img src={profileS} alt="" width={100} className='pr-3' />
                                <div className='flex flex-col w-32'>
                                    <h2 className="text-xl font-medium mb-2 overflow-hidden text-[#B72024] font-poppins">
                                        <span className="truncate">{teachers.teacher_name}</span>

                                    </h2>
                                    <p className="text-sm font-poppins">counseling teacher</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/student/${teachers}`)} // Sesuaikan rute berdasarkan logika rute aplikasi Anda
                                    className='ml-10 mt-auto px-3 py-1 h-fit rounded-md bg-[#B72024] text-white'
                                >
                                    Start
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SCounseling