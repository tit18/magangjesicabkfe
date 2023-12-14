import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import icon from '../components/icon/telkomSchools.png';
import { BASE_API_URL } from '../global.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TLogin = () => {
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({
        nik: '',
        password: '',
    });

    const handleChange = (e) => {
        setTeacher((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let data = {
            nik: teacher.nik,
            password: teacher.password,
        };

        try {
            const result = await axios.post(`${BASE_API_URL}/teacher/login`, data);

            if (result.data.status === true) {
                const { id_teacher, teacher_name, token, photo } = result.data.data;

                toast.success('Login Success');

                // Simpan informasi pengguna di sessionStorage
                sessionStorage.setItem('teacher', JSON.stringify(result.data));
                sessionStorage.setItem('tokeen', token);

                // Redirect ke dashboard
                navigate("/teacher/dashboard");
            } else {
                toast.error('Login Failed, NIK or Password is wrong');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Login Error');
        }
    };

    // Cek apakah pengguna sudah login, jika ya redirect ke dashboard
    // if (sessionStorage.getItem('tokeen')) {
    //     navigate("/teacher/dashboard");
    //     return null; // Pastikan untuk menghentikan render komponen setelah redirect
    // }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50  sm:px-5 md:px-10 lg:px-15">
            <ToastContainer />
            <div className="w-full max-w-lg p-6  h-fit bg-white rounded-2xl shadow-md pb-20">
                <img src={icon} alt="Telkom Schools Logo" className="mx-auto w-[50px] h-[50px]" />
                <div className="block mb-10 text-center text-black text-base font-medium font-poppins ">SMK TELKOM MALANG</div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="nik" className="block mb-2 text-[#B72024] font-sans">
                            NIK
                        </label>
                        <input
                            type="number"
                            name="nik"
                            placeholder="NIK"
                            id="nik"
                            value={teacher.nik}
                            onChange={handleChange}
                            className="w-full h-12 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-[#B72024] font-sans">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password"
                            value={teacher.password}
                            onChange={handleChange}
                            className="w-full h-12 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center block mb-8 "
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#B72024] text-white p-2.5 rounded-md  hover:bg-red-600 focus:ring-red-800 focus:outline-none">
                        Login
                    </button>
                </form>
                <div className='text-center mt-2 hover:text-[#B72024]'>
                    <Link to="/">Are you a student? Login here</Link>
                </div>
            </div>
        </div>
    );
};


export default TLogin;