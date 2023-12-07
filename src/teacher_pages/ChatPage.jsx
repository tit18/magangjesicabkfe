// ChatPage.js
import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import profileS from '../components/icon/profile-student.png';
import send from '../components/icon/send-icon.svg';
import { BASE_API_URL } from '../global';
import axios from 'axios';

const TChatPage = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate()
    const [message, setMessage] = useState("");

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const data = {
            id_student : state.id,
            id_teacher : sessionStorage.getItem('id_teacher'),
            tipe_user : "teacher",
            counseling : message
        }
        try {
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.post(
                `${BASE_API_URL}/online/addteacher`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data.status);

            if (response.data.status === true) {
                navigate(0);
            }
        } catch (error) {
            console.error('Error:', error);
            // TODO: Handle error if needed
        }

    };

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto flex flex-col items-center justify-center pt-28 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">Active Online Session</h1>
                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 h-fit bg-white drop-shadow-lg p-4 flex flex-col justify-between'>
                        {state && (
                            <div className='flex gap-4'>
                                <img
                                    src={profileS}
                                    alt="profile student"
                                    className="rounded-full h-16 w-16 object-cover object-center overflow-hidden"
                                />
                                <div className='flex flex-col items-start justify-around'>
                                    <p className='text-xl text-[#B72024] font-semibold'>Name: {state.name}</p>
                                    <p className='text-base font-normal'>NIS: {state.nis}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 min-h-[600px] bg-white drop-shadow-lg p-8 flex flex-col justify-between'>

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
                                <img src={send} alt=""  />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TChatPage;
