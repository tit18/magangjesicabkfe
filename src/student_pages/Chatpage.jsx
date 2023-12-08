// ChatPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/General/Navbar';
import send from '../components/icon/send-icon.svg';
import { BASE_API_URL } from '../global';
import axios from 'axios';
import { BASE_IMAGE_URL } from '../global';

const TChatPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [chaTeachers, setchaTeachers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // ...

useEffect(() => {
    const fetchchaTeachers = async () => {
        try {
            // Ganti dengan URL API sesuai kebutuhan Anda
            const token = sessionStorage.getItem('tokeen')

            const response = await axios.get(`${BASE_API_URL}/online/getonline/${state.id_conseling}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setchaTeachers(response.data.data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    // Panggil fungsi untuk mengambil data guru
    fetchchaTeachers();
}, [state.id_conseling]);

// ...


            console.log('id_conseling- ',state.id_conseling)
            console.log('data', chaTeachers && chaTeachers.photo);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id_student: sessionStorage.getItem('id_student'),
            id_teacher: state.id_teacher,
            tipe_user: "student",
            counseling: message
        }
        try {
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.post(
                `${BASE_API_URL}/online/addstudent`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            // if (response.status === 200) {
            //     navigate(0);
            // }
        } catch (error) {
            console.error('Error:', error);
            // TODO: Handle error if needed
        }

    };

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <Navbar />
            <div className="overflow-x-auto flex flex-col items-center justify-center pt-28 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">Active Online Session</h1>
                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 h-fit bg-white drop-shadow-lg p-4 flex flex-col justify-between'>
                        {state && (
                            <div className='flex gap-4'>
                                <img
                                    src={`${BASE_IMAGE_URL}/${chaTeachers.photo}`}
                                    alt="profile student"
                                    className="rounded-full h-16 w-16 object-cover object-center overflow-hidden"
                                />
                                <div className='flex flex-col items-start justify-around'>
                                    <p className='text-xl text-[#B72024] font-semibold'>Name: {state.name}</p>
                                    <p className='text-base font-normal'>Nik: {state.nik}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 min-h-[600px] bg-white drop-shadow-lg p-8 flex flex-col justify-between'>
                        <div className="flex items-start gap-2.5">
                            <img
                                className="w-8 h-8 rounded-full"
                                src={`${BASE_IMAGE_URL}/${state.photo}`}
                                alt="Jese image"
                            />
                            <div className="flex flex-col gap-1 w-full max-w-[320px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-black">
                                        {state.name}

                                    </span>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        11:46/static
                                    </span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                                        That's awesome. I think our users will really appreciate the
                                        improvements.
                                    </p>
                                </div>

                            </div>
                            <button
                                id="dropdownMenuIconButton"
                                data-dropdown-toggle="dropdownDots"
                                data-dropdown-placement="bottom-start"
                                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                                type="button"
                            >
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 4 15"
                                >
                                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                            </button>

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
