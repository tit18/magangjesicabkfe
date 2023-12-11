// Assuming your file is named 'config.js'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import icon from '../components/icon/telkomSchools.png';
import { BASE_API_URL, BASE_IMAGE_URL } from '../global.js'; // Update the import statement


export default function SLogin() {
    const navigate = useNavigate()
    const [student, setstudent] = useState({
        nis: '',
        password: '',
    })

    const [studentData, setstudentData] = useState(null);
    const [studentPhotoUrl, setstudentPhotoUrl] = useState('');

    const handleChange = (e) => {
        setstudent(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let data = {
            nis: student.nis,
            password: student.password
        }

        try {
            const result = await axios.post(`${BASE_API_URL}/student/login`, data)

            if (result.data.status === true) {
                const idStudent = result.data.data.id_student;
                const studentname = result.data.data.student_name
                const toke = result.data.data.token;
                const photo = result.data.data.photo;

                alert('Login Success')
                console.log(result.data.data)
                sessionStorage.setItem('student_logged', result.data.status)
                sessionStorage.setItem('student', JSON.stringify(result.data))
                sessionStorage.setItem('id_student', idStudent);
                sessionStorage.setItem('tokeen', toke)
                sessionStorage.setItem('name', studentname)
                sessionStorage.setItem('photo', photo)
                navigate("/dashboard")
            } else {
                alert('Login Failed')
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login Failed');
        }

        

    };

    useEffect(() => {
        // Fetch student photo data after successful login
        const fetchstudentPhoto = async () => {
            if (studentData && studentData.photo) {
                try {
                    const photoResponse = await axios.get(`${BASE_IMAGE_URL}/${studentData.photo}`, {
                        responseType: 'arraybuffer',
                    });

                    const photoBlob = new Blob([photoResponse.data], { type: photoResponse.headers['content-type'] });
                    const photoUrl = URL.createObjectURL(photoBlob);

                    // Set the student photo URL in the state
                    setstudentPhotoUrl(photoUrl);
                } catch (photoError) {
                    console.error('Error fetching student photo:', photoError);
                }
            }
        };

        fetchstudentPhoto();
    }, [studentData]);

    return (
        <div className="flex items-center justify-center h-screen bg-[#F9F9F9] sm:px-5 md:px-10 lg:px-15">
            <div className="w-full max-w-lg p-6  h-fit bg-white rounded-2xl shadow-md pb-20">
                <img src={icon} alt="Telkom Schools Logo" className="mx-auto w-[50px] h-[50px]" />
                <div className="block mb-10 text-center text-black text-base font-medium font-poppins ">SMK TELKOM MALANG</div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="nis" className="block mb-2 text-[#B72024] font-sans">
                            NIS
                        </label>
                        <input
                            type="number" // Corrected type
                            name="nis"
                            placeholder="Text"
                            id="nis"
                            value={student.nis}
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
                            value={student.password}
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


