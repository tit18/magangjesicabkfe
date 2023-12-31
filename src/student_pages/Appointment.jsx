import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import Navbar from '../components/General/Navbar';
import { BASE_API_URL } from '../global.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const SAppointment = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                // Get token from sessionStorage
                const token = sessionStorage.getItem('tokeen')

                // Make GET request to /teacher/getteacher with Authorization header
                const response = await axios.get(`${BASE_API_URL}/teacher/getteacher`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Set teachers state with the received data
                setTeachers(response.data.data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        fetchTeachers();
    }, []);

    // State to manage form data
    const data = JSON.parse(sessionStorage.getItem('student'));
    const idStudent = sessionStorage.getItem('id_student');
    const studentname = sessionStorage.getItem('name')
    const nis = sessionStorage.getItem('nis')
    //const tokeen = sessionStorage.getItem('tokeen')

    const [formData, setFormData] = useState({
        id_student: Number(nis),
        student_name: studentname,
        id_teacher: teachers.id_teacher,
        meeting_date: '',
    });

    //check data 


    console.log('data.id_student:', idStudent);
    console.log('data', data.token)
    console.log('data teacher', teachers)
    console.log('nama', studentname)


    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            id_student: formData.id_student,
            id_teacher: formData.id_teacher,
            meeting_date: formData.meeting_date,
        };

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const token = sessionStorage.getItem('tokeen');

            const response = await axios.post(
                `${BASE_API_URL}/conseling`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Show success alert
            if (response.data.status === true){
            toast.success('Appoinment submitted successfully!');
            } else {
                toast.error('you already have an appointment')
            }

            // Handle the response from the server if needed
            console.log('Server response:', response.data);
        } catch (error) {
            // Handle errors
            console.error('Error submitting form:', error);
        }

    };
    console.log('formData:', formData);

    return (

        <div className="w-full h-full bg-[#fefcfc] overflow-hidden font-poppins">
            <Navbar />
            <ToastContainer/>
            <div className='overflow-x-auto overflow-y flex flex-col items-center justify-center pt-20 gap-4 font-poppins bg-whitef'>
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <div className="p-2 rounded-md space-y-2">
                        <h1 className="text-3xl font-bold font-poppins text-center">CURHApps Counseling Appointment</h1>
                        <p className="text-base font-poppins text-center pb-5">
                            Make an appointment with counseling teacher to be able to conduct counseling sessions offline.
                        </p>
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id_student" className="text-[#B72024] font-sans">
                                    Student NIS
                                </label>
                                <input
                                    value={formData.id_student}
                                    type="number"
                                    name="id_student"
                                    id="id_student"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    readOnly
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="text-[#B72024] font-sans">
                                    Student Name
                                </label>
                                <input
                                    value={studentname}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label htmlFor="id_teacher" className="text-[#B72024] font-sans">
                                    Teacher
                                </label>
                                <select
                                    value={formData.id_teacher}
                                    type="text"
                                    name="id_teacher"
                                    placeholder="JOHN DOE"
                                    id="id_teacher"
                                    className="w-full h-13 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">~~Choose Teacher~~</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id_teacher} value={teacher.id_teacher}>
                                            {teacher.teacher_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date" className="text-[#B72024] font-sans">
                                    Counseling Date
                                </label>
                                <input
                                    value={formData.meeting_date}
                                    type="datetime-local"
                                    name="meeting_date"
                                    placeholder="12/06/2023"
                                    id="meeting_date"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#B72024] text-white p-2.5 rounded-md hover:bg-red-600 focus:ring-red-800 focus:outline-none"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 text-xs font-normal text-gray-500 font-Poppins">
                © {new Date().getFullYear()} Copyright CURHApps All Rights Reserved.
            </div>
        </div>
    );
};

export default SAppointment;