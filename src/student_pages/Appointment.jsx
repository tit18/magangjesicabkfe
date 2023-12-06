import React from 'react';
import '../index.css'; // Pastikan Anda mengimpor file Tailwind CSS atau file yang memuat konfigurasi Tailwind CSS
import Navbar from '../components/General/Navbar';

const SAppointment = () => {
    return (
        <div className="">
            <Navbar />
            <div className='flex items-center justify-center h-screen   sm:px-5 md:px-10 lg:px-15s'>
                <div className="w-full max-w-2xl p-4 mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className=" p-2 rounded-md ">
                        <h1 className="text-xl font-bold font-poppins mb-2 text-center">
                            CURHApps Online Counseling
                        </h1>
                        <p className="text-sm font-normal font-poppins mb-2 text-center">
                            Make an appointment with the guidance and counseling teacher to be able to conduct counseling sessions offline.
                        </p>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="NIS" className="text-[#B72024] font-sans">
                                    NIS
                                </label>
                                <input
                                    type="number"
                                    name="NIS"
                                    placeholder="62520912"
                                    id="NIS"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="text-[#B72024] font-sans">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="IRSYAD RISNO"
                                    id="name"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="teacher" className="text-[#B72024] font-sans">
                                    Teacher
                                </label>
                                <input
                                    type="Text"
                                    name="teaher"
                                    placeholder="JOHN DOE"
                                    id="Nama"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="date" className="text-[#B72024] font-sans">
                                    date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    placeholder="12/06/2023"
                                    id="teacher"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="text-[#B72024] font-sans">
                                    time
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    placeholder="Text"
                                    id="teacher"
                                    className="w-full h-10 px-2 py-3 bg-white border-2 border-neutral-100 justify-start items-center gap-2 inline-flex"
                                    required
                                />
                            </div>
                            {/* ... (your other form fields) */}
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
        </div>
    );
};

export default SAppointment;
