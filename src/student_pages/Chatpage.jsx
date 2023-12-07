// ChatPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import profileS from '../components/icon/profile-student.png';
import { BASE_IMAGE_URL } from '../global.js'


const TChatPage = () => {
    const location = useLocation();
    const { state } = location;

    console.log(state.photo)
    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-28 font-poppins">
                <div className="w-full h-fit bg-white shadow-lg py-1 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins text-center">Active Online Session</h1>
                    <div className='sm:w-11/12 md:w-9/12 lg:w-7/12 h-fit bg-white drop-shadow-lg p-4'>
                        {state && (
                            <div className='flex gap-4'>
                                <img
                                    src={`${BASE_IMAGE_URL}/${state.photo}`}
                                    alt="profile student"
                                    className="rounded-full h-16 w-16 object-cover object-center overflow-hidden"
                                />
                                <div className='flex flex-col items-start justify-around'>
                                    <p className='text-xl text-[#B72024] font-semibold'>{state.name}</p>
                                    <p className='text-base font-normal'>Counseling Teacher</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TChatPage;
