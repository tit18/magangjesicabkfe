// Assuming your file is named 'config.js'
import React, { useState } from 'react';

import axios from 'axios';
import '../index.css';
import icon from '../components/icon/telkomSchools.png';
import { BASE_API_URL } from '../global.js'; // Update the import statement


const SLogin = () => {
    const [user, setUser] = useState({
        nis: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginUrl = `${BASE_API_URL}/student/login`;

        try {
            const response = await axios.post(loginUrl, user);
            // Handle the API response
            console.log('API Response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('API Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50  sm:px-5 md:px-10 lg:px-15">
            <div className="w-full max-w-lg p-6  h-fit bg-white rounded-2xl shadow-md pb-20">
                <img src={icon} alt="Telkom Schools Logo" className="mx-auto w-[50px] h-[50px]" />
                <div className="block mb-10 text-center text-black text-base font-medium font-poppins ">SMK TELKOM MALANG</div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="NIS" className="block mb-2 text-[#B72024] font-sans">
                            NIS
                        </label>
                        <input
                            type="number" // Corrected type
                            name="nis"
                            placeholder="Text"
                            id="nis"
                            value={user.nis}
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
                            placeholder="Text"
                            id="password"
                            value={user.password}
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
            </div>
        </div>
    );
};

export default SLogin;
