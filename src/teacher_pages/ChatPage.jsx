// ChatPage.js
import React, { useEffect, useState } from 'react';
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
    const [listChat, setListChat] = useState([]);
    const teacherName = sessionStorage.getItem('name'); // Replace with actual way to get teacher name
    const studentName = state ? state.name : '';

    const fetchChat = async (e) => {
        try {
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.get(
                `${BASE_API_URL}/online/getonline/${state.id_counseling}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data.status);

            if (response.data.status === true) {
                setListChat(response.data.data)
            }
        } catch (error) {
            console.error('Error:', error);
            // TODO: Handle error if needed
        }
    }

    useEffect(() => {
        fetchChat();
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Chat: message
        }
        try {
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.post(
                `${BASE_API_URL}/online/insertchatguru`,
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

    const chatMessages = [
        { id: 1, sender: 'teacher', message: 'Hello, how can I help you? kzbsfh ofojssbf obsi bzdibvizsfsdb ibais ia si aihfib  auhwuf ahfabuba   idbijbf aiobaibibdsob isdf iusdbugisiuhisbdvbsibd sdi sidbibdvisubdvbsiudbvsubviubsdi bsudbvsvbsibvsbviusbdi bsdbv sbvd ubdiubv sbdvius iv bsub' },
        { id: 2, sender: 'student', message: 'I have a question about the assignmen auwhdiasbcu aboua ucbaub coausbcabscb apbdcbaibpibavbapis aib iabs icabut.' },
        { id: 2, sender: 'student', message: 'I have a question about the assignmen auwhdiasbcu aboua ucbaub coausbcabscb apbdcbaibpibavbapis aib iabs icabut.' },
        { id: 1, sender: 'teacher', message: 'Hello, how can I help you? kzbsfh ofojssbf obsi bzdibvizsfsdb ibais ia si aihfib  auhwuf ahfabuba   idbijbf aiobaibibdsob isdf iusdbugisiuhisbdvbsibd sdi sidbibdvisubdvbsiudbvsubviubsdi bsudbvsvbsibvsbviusbdi bsdbv sbvd ubdiubv sbdvius iv bsub' },
        { id: 1, sender: 'teacher', message: 'Hello, how can I help you? kzbsfh ofojssbf obsi bzdibvizsfsdb ibais ia si aihfib  auhwuf ahfabuba   idbijbf aiobaibibdsob isdf iusdbugisiuhisbdvbsibd sdi sidbibdvisubdvbsiudbvsubviubsdi bsudbvsvbsibvsbviusbdi bsdbv sbvd ubdiubv sbdvius iv bsub' },
        { id: 2, sender: 'student', message: 'I have a question about the assignmen auwhdiasbcu aboua ucbaub coausbcabscb apbdcbaibpibavbapis aib iabs icabut.' },
        // Add more messages as needed
    ];

        return (
            <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
                <NavbarTeacher />
                <div className="overflow-x-auto flex flex-col items-center justify-center pt-10  font-poppins">
                    <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold font-poppins text-center">Active Online Session</h1>
                        <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 h-fit bg-white drop-shadow-lg p-4 flex flex-col justify-between'>
                            {state && (
                                <div className='flex gap-4'>
                                    <img
                                        src={state.foto}
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

                            {/* Chat Container */}
                            <div className='min-h-[450px] max-h-[450px] bg-white overflow-y-auto'>
                                {chatMessages.map((chat) => (
                                    <div key={chat.id_counseling} className={`flex flex-col items-start mb-4`}>
                                        <p className={`text-sm text-[#B72024] ${chat.sender === 'teacher' ? 'ml-auto' : 'mr-auto'}`}>
                                            {chat.sender === 'teacher' ? teacherName : studentName}
                                        </p>
                                        <div
                                            className={`flex ${chat.sender === 'teacher' ? 'justify-end' : 'justify-start'
                                                } items-center`}
                                        >
                                            {chat.sender === 'teacher' ? (
                                                <>
                                                    <div
                                                        className='bg-[#F9F9F9] text-black rounded-lg p-3 max-w-[70%] drop-shadow-lg ml-auto'
                                                    >
                                                        {chat.message}
                                                    </div>
                                                    <img
                                                        src={profileS}  // Provide the source for teacher's photo
                                                        alt="profile teacher"
                                                        className="rounded-full h-12 w-12 object-cover object-center overflow-hidden ml-4"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        src={state.foto}  // Provide the source for student's photo
                                                        alt="profile student"
                                                        className="rounded-full h-12 w-12 object-cover object-center overflow-hidden mr-4"
                                                    />
                                                    <div
                                                        className='bg-[#F9F9F9] text-black rounded-lg p-3 max-w-[70%] drop-shadow-lg'
                                                    >
                                                        {chat.message}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
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
