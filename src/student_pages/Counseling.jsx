import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL, BASE_IMAGE_URL } from '../global.js';
import Navbar from "../components/General/Navbar";
import axios from "axios";
import iconNotif from '../components/icon/notification-icon.svg';
import iconAdd from '../components/icon/plus-circle-fill.svg';
import Modal from 'react-modal';
import "../index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SCounseling = () => {
    const [teachers, setTeachers] = useState([])
    const [session, setSession] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState("")
    const [counseling, setCounseling] = useState("")
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchTeachers = async () => {
        try {
            // Ganti dengan URL API sesuai kebutuhan Anda
            const token = sessionStorage.getItem('tokeen')

            const response = await axios.get(`${BASE_API_URL}/teacher/getteacher`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTeachers(response.data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchSession = async () => {
        try {
            // Ganti dengan URL API sesuai kebutuhan Anda
            const token = sessionStorage.getItem('tokeen')

            const response = await axios.get(`${BASE_API_URL}/online/getchatguru`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSession(response.data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchTeachers()
        fetchSession()
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            // Ganti dengan URL API sesuai kebutuhan Anda
            const token = sessionStorage.getItem('tokeen')
            const data = {
                id_teacher: selectedTeacher,
                counseling: counseling
            }

            const response = await axios.post(`${BASE_API_URL}/online/addstudent`,
            data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.data.status === true){
                alert("Success Add Counseling Online")
                fetchSession()
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsModalOpen(false)

    }

    
    return (
        <div className="w-full h-full bg-[#ffffff] overflow-hidden font-poppins">
            <div>
                <Navbar />
            </div>
            <ToastContainer />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-20 gap-4 font-poppins bg-whitef">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">CURHApps Online Counseling</h1>
                    <p className="text-base font-poppins text-center">
                        Here is a list of teachers available for online counseling; please choose one.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
                        {session.map(teachers => (
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
            {/* Bottom Centered Content */}
            <button className='fixed bottom-5 right-5'onClick={openModal} >
                <img src={iconAdd} alt="Add" style={{ fill: 'green' }} width={50} />
            </button>
            <div className="text-center mt-4 text-xs font-normal text-gray-500 font-Poppins">
                © {new Date().getFullYear()} Copyright CURHApps All Rights Reserved.
            </div>
            <Modal
                        isOpen={isModalOpen}
                        //onRequestClose={closeModal}
                        contentLabel="Result Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                // width: '35%',
                                // height: '50%',
                                top: '20%',
                                right: '20%',
                                left: '20%',
                                bottom: '20%',
                                margin: 'auto',
                                borderRadius: '20px',
                            },
                        }}
                    >
                        <div className='flex flex-col p-6'>
                            <h1 className='text-2xl font-poppins font-bold text-center'>Add New Counseling</h1>
                            <p className='text-sm font-poppins font-light text-center'>you only can have one online session with the same teacher</p>
                            <form action="" className='pt-5 h-full' onSubmit={handleSubmit}>

                                <label className='text-[#B72024]'>Teacher</label>
                                <select
                                    value={selectedTeacher}
                                    type="text"
                                    name="id_teacher"
                                    placeholder="JOHN DOE"
                                    id="id_teacher"
                                    className="w-full h-13 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    onChange={(e) => {setSelectedTeacher(e.target.value)}}
                                    required
                                >
                                    <option value="">~~Choose Teacher~~</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id_teacher} value={teacher.id_teacher}>
                                            {teacher.teacher_name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="Result" className='text-[#B72024]'>Counseling Message</label>
                                <textarea
                                    placeholder='Text Area'
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => setCounseling(e.target.value)}
                                    className='w-full h-32 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex'>
                                </textarea>

                                <div className='mt-auto space-x-2 pt-2 flex'>
                                    <button className='px-4 py-1 bg-[#C0392B] text-white rounded' onClick={closeModal}>Close</button>
                                    <button className='px-4 py-1 bg-[#27AE60] text-white rounded' type='submit'>Save</button>
                                </div>

                            </form>
                        </div>

                    </Modal>
        </div >


    )
}

export default SCounseling