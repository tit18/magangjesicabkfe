import React, {  } from 'react';
// import { useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
// import axios from 'axios';
// import { BASE_API_URL } from '../global';
// import moment from 'moment';
import profileS from '../components/icon/profile-student.png';
import icon from '../components/icon/profile.png';

const TCounseling = () => {
    // const [tcounseling, setTcounseling] = useState([]);


    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-28 gap-4 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins">Dashboard</h1>
                    <p className="text-base font-poppins text-center">
                        Welcome to the CURHApps Dashboard. This is your central hub for managing various aspects of the application.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Sample Card 1 */}
                        <div className="bg-white flex p-4 rounded drop-shadow-lg">
                            <div className="absolute top-[-10px] right-[-10px] p-2">
                                {/* Tambahkan elemen ikon notifikasi di sini */}
                                <img src={icon} alt="Notification" width={40} />
                                <span className="bg-red-500 rounded-full text-white px-2 py-1 text-xs absolute -top-0 -right-0">
                                    3 {/* Isi jumlah notifikasi */}
                                </span>
                            </div>
                            <img src={profileS} alt="" width={100} className='pr-3' />
                            <div className='flex flex-col'>
                                <h2 className="text-xl font-bold mb-2">Sisca Rahayu</h2>
                                <p className="text-lg">Student</p>
                            </div>
                            <button className='ml-10 mt-auto px-3 py-1 h-fit rounded-md bg-[#B72024] text-white'>Enter</button>
                        </div>

                        {/* Sample Card 2 */}
                        <div className="bg-green-200 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-2">Pending Approvals</h2>
                            <p className="text-lg">25</p>
                        </div>

                        {/* Sample Card 3 */}
                        <div className="bg-yellow-200 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-2">Today's Schedule</h2>
                            <p className="text-lg">10 Appointments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TCounseling;