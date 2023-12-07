import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import axios from 'axios';
import { BASE_API_URL } from '../global';
import profileS from '../components/icon/profile-student.png';
import iconNotif from '../components/icon/notification-icon.svg';

const TCounseling = () => {
    const [tcounseling, setTcounseling] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('tokeen');
            const response = await axios.get(`${BASE_API_URL}/student/getstudent`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setTcounseling(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const cardStudent = (data) => {
        return (
            <div key={data.id_student} className="bg-white flex p-4 rounded drop-shadow-lg relative">
                <div className="absolute top-[-30px] right-[-30px] p-2">
                    <div className='w-16 h-16 p-2 bg-white drop-shadow-md rounded-full flex items-center justify-center'>
                        <img src={iconNotif} alt="Notification" width={38} />
                    </div>
                    <span className="bg-[#B72024] drop-shadow-sm rounded-full text-white px-2 py-1 text-xs absolute top-4 right-4">
                        {/* {student.notificationCount} */} 3
                    </span>
                </div>
                <img src={profileS} alt="" width={100} className='pr-3' />
                <div className='flex flex-col w-32'>
                    <h2 className="text-xl font-bold mb-2 overflow-hidden">
                        <span className="truncate">{data.student_name}</span>
                    </h2>
                    <p className="text-lg">{data.nis}</p>
                </div>
                <button
                    onClick={() => navigate(`/teacher/counseling/${data.id_student}`, {
                        state: {id: data.id_student, name: data.student_name, nis: data.nis },
                    })}
                    className='ml-10 mt-auto px-3 py-1 h-fit rounded-md bg-[#B72024] text-white'
                >
                    Enter
                </button>
            </div>
        )
    }

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-28 gap-4 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">CURHApps Online Counseling</h1>
                    <p className="text-base font-poppins text-center">
                        Here is a list of students waiting for online counseling; please respond as soon as possible.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
                        {tcounseling && tcounseling.length > 0 ? (
                            tcounseling.map((item) => cardStudent(item))
                        ) : (
                            <tr>
                                <td colSpan="4" className="pl-4 font-poppins text-center">
                                    No appointments available.
                                </td>
                            </tr>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TCounseling;
