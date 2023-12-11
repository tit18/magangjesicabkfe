// ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import send from '../components/icon/send-icon.svg';
import { BASE_API_URL, BASE_IMAGE_URL } from '../global';
import axios from 'axios';
import moment from 'moment/moment';

const TChatPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [chatStudent, setChatStudent] = useState([]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchchatstudent = async () => {
            try {
                // Ganti dengan URL API sesuai kebutuhan Anda
                const token = sessionStorage.getItem('tokeen')

                const response = await axios.get(`${BASE_API_URL}/online/getonline/${state.id_conseling}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChatStudent(response.data.data);
    
                scrollToBottom();
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        // Panggil fungsi untuk mengambil data guru
        fetchchatstudent();


        // Set up interval to fetch data every 5 seconds (adjust the interval as needed)
        const intervalId = setInterval(() => {
            fetchchatstudent();
        }, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [state.id_conseling]);
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Chat: message
        }
        try {
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.post(
                `${BASE_API_URL}/online/insertchatguru/${state.id_conseling}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (response.status === 200) {
                navigate(0);
                scrollToBottom();
            }
        } catch (error) {
            console.error('Error:', error);
            // TODO: Handle error if needed
        }

    };
    const scrollToBottom = () => {
        // Scroll to the bottom of the messages container
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDateTime = momentDate.format('DD/MM/YYYY HH:mm:ss');
        return { formattedDateTime };
    };

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto flex flex-col items-center justify-center pt-10 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">Active Online Session</h1>
                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 h-fit bg-white drop-shadow-lg p-4 flex flex-col justify-between'>
                        {state && (
                            <div className='flex gap-4'>
                                <img
                                    src={`${state.photo}`}
                                    alt={state.photo}
                                    className="rounded-full h-16 w-16 object-cover object-center overflow-hidden"
                                />
                                <div className='flex flex-col items-start justify-around'>
                                    <p className='text-xl text-[#B72024] font-semibold'>Name: {state.name}</p>
                                    <p className='text-base font-normal'>NIS: {state.nis}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 max-h-[400px] bg-white drop-shadow-lg p-8 flex flex-col justify-between '>
                        <div className='overflow-y-scroll'>
                            {chatStudent.map(students => (
                                students.tipe_user === "student" ?
                                    <div className="flex items-start gap-2.5">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={`${BASE_IMAGE_URL}/${students.photo}`}
                                            alt={students.photo}
                                        />
                                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-[#B72024]">
                                                    {students.nama_user}

                                                </span>
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {formatDate(students.createdAt).formattedDateTime}
                                                </span>
                                            </div>
                                            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-l-xl ">
                                                <p className="font-poppins  dark:text-black">
                                                    {students.counseling}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-start gap-2.5 justify-between">
                                        <div className="flex flex-col gap-1 w-full max-w-[320px] ml-auto">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-auto">
                                                    {formatDate(students.createdAt).formattedDateTime}
                                                </span>
                                                <span className="text-sm font-semibold text-[#B72024]">
                                                    {students.nama_user}
                                                </span>

                                            </div>
                                            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100  rounded-l-xl  rounded-r-xl     ">
                                                <p className="text-sm font-poppins  dark:text-black">
                                                    {students.counseling}
                                                </p>
                                            </div>
                                        </div>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={`${BASE_IMAGE_URL}/${students.photo}`}
                                            alt={students.photo}
                                        />
                                    </div>

                            ))}
                            <div ref={messagesEndRef}></div>
                        </div>
                        <form className='mt-auto flex items-center' onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name=""
                                id="messageInput"
                                className='w-full bg-gray-200 h-12 p-5'
                                placeholder='Your message'
                                onChange={((e) => setMessage(e.target.value))}
                            />
                            <button
                                type="submit"
                                className='bg-gray-200 text-white h-12 px-4'
                            >
                                <img src={send} alt="" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TChatPage;
