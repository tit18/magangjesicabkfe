import React, { useState, useEffect } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/General/Navbar";
import axios from "axios";
import { BASE_API_URL } from '../global.js';
import { BASE_IMAGE_URL } from '../global.js'
import iconNotif from '../components/icon/notification-icon.svg';

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

                const response = await axios.get(`${BASE_API_URL}/online/getchatguru`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTeachers(response.data.data);
                setLoading(false);

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
    console.log('photo', teachers.photo)

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <div>
                <Navbar />
            </div>
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-28 gap-4 font-poppins bg-white">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">CURHApps Online Counseling</h1>
                    <p className="text-base font-poppins text-center">
                        Here is a list of teachers available for online counseling; please choose one.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
                        {teachers.map(teachers => (
                            <div key={teachers.id_teacher} className="bg-white flex p-4 rounded drop-shadow-lg relative">
                                <div className="absolute top-[-30px] right-[-30px] p-2">
                                    <div className='w-16 h-16 p-2 bg-white drop-shadow-md rounded-full flex items-center justify-center'>
                                        <img src={iconNotif} alt="Notification" width={30} />
                                    </div>
                                    <span className="bg-[#B72024] drop-shadow-sm rounded-full text-white px-2 py-1 text-xs absolute top-4 right-4">
                                        {teachers.jumlah_chat}
                                    </span>
                                </div>
                                <img src={teachers.photo ? `${BASE_IMAGE_URL}/${teachers.photo}` : ''} alt="" width={100} className='pr-3 object-cover object-center w-24 h-32' />
                                <div className='flex flex-col w-32'>
                                    <h2 className="text-xl font-medium mb-2 overflow-hidden text-[#B72024] font-poppins">
                                        <span className="truncate">{teachers.teacher_name}</span>

                                    </h2>
                                    <p className="text-sm font-poppins">counseling teacher</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/counseling/${teachers.id_teacher}`, {
                                        state: { id_teacher: teachers.id_teacher, name: teachers.teacher_name, nik: teachers.nik, photo: teachers.photo, id_conseling: teachers.id_conseling, },
                                    })} // Sesuaikan rute berdasarkan logika rute aplikasi Anda
                                    className='ml-10 mt-auto px-3 py-1 h-fit rounded-md bg-[#B72024] text-white'>
                                    Start
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SCounseling