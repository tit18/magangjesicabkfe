import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import axios from 'axios';
import { BASE_API_URL, BASE_IMAGE_URL } from '../global';
import profileS from '../components/icon/profile-student.png';
import iconNotif from '../components/icon/notification-icon.svg';

const TCounseling = () => {
    const [chatSiswa, setChatSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('tokeen');
            const response = await axios.get(`${BASE_API_URL}/online/getchatguru`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Set the photo in the state
            const chatDataWithPhotos = response.data.data.map(item => ({
                ...item,
                photo_student: item.photo_student ? `${BASE_IMAGE_URL}/${item.photo_student}` : profileS,
            }));

            setChatSiswa(chatDataWithPhotos);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);

            // Handle invalid token or other errors causing logout
            if (error.response && error.response.status === 401) {
                handleLogout();
            } else {
                setError(error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/teacher");
    };

    const cardStudent = (data) => {
        return (
            <div key={data.id_student} className="bg-white flex p-4 rounded drop-shadow-lg relative m-6">
                <div className="absolute top-[-30px] right-[-30px] p-2">
                    <div className='min-w-16 h-16 p-2 bg-white drop-shadow-md rounded-full flex items-center justify-center'>
                        <img src={iconNotif} alt="Notification" width={38} />
                    </div>
                    <span className="bg-[#B72024] drop-shadow-sm rounded-full text-white px-2 py-1 text-xs absolute top-4 right-4">
                        {data.jumlah_chat}
                    </span>
                </div>
                <div className='w-24 h-32 border mr-2'>
                    <img src={data.photo_student} alt="" width={100} className='h-full w-full object-cover' />
                </div>
                <div className='flex flex-col w-32'>
                    <h2 className="text-xl font-bold mb-2 overflow-hidden">
                        <span className="truncate">{data.student_name}</span>
                    </h2>
                    <p className="text-lg">{data.nis}</p>
                </div>
                <button
                    onClick={() => navigate(`/teacher/counseling/chat`, {
                        state: { id_student: data.id_student, id_conseling: data.id_conseling, name: data.student_name, nis: data.nis, photo: data.photo_student },
                    })}
                    className='ml-10 mt-auto px-3 py-1 h-fit rounded-md bg-[#B72024] text-white'
                >
                    Enter
                </button>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-10 gap-4 font-poppins">
                <div className="w-full bg-[#F9F9F9] shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">CURHApps Online Counseling</h1>
                    <p className="text-base font-poppins text-center">
                        Here is a list of students waiting for online counseling; please respond as soon as possible.
                    </p>
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-center">Error: {error.message}</p>}
                    {chatSiswa && chatSiswa.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
                            {chatSiswa.map((item) => cardStudent(item))}
                        </div>
                    ) : (
                        <div className="text-center w-7/12 bg-green-100 py-3 rounded-lg ring-1 ring-inset ring-green-600/20">
                            <span className='font-semibold text-green-600'>No Counseling Available</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TCounseling;
