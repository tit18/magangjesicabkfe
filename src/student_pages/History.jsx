import React, { useState, useEffect } from 'react';
import "../index.css";
import Navbar from "../components/General/Navbar";
import axios from 'axios';
import { BASE_API_URL } from '../global.js';
import moment from 'moment/moment';
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';

const SHistory = () => {
    const [history, setHistory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [rating, setRating] = useState();
    const [selectedConselingId, setSelectedConselingId] = useState(null); // New state
    const navigate = useNavigate()

    const fetchhistory = async () => {
        try {
            const token = sessionStorage.getItem('tokeen');
            const response = await axios.get(`${BASE_API_URL}/teacher/conseling_history_student`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.data); // Log the response data

            setHistory(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    const fetchrating = async () => {
        try {
            const token = sessionStorage.getItem('tokeen');
            const response = await axios.post(`${BASE_API_URL}/student/conseling_rating/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.data); // Log the response data

            setRating(response.data.data);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    useEffect(() => {
        fetchhistory();
        fetchrating();
    }, []);

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDate = momentDate.format('DD/MM');
        const formattedTime = momentDate.format('HH:mm');
        return { formattedDate, formattedTime };
    };

    const handleResultButtonClick = (data) => {
        setIsModalOpen(true);
        setSelectedTeacher(data);
        setSelectedConselingId(data.id_conseling); // Set the id_conseling in the state
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Ganti dengan URL API sesuai kebutuhan Anda
            const token = sessionStorage.getItem('tokeen')
            const data = {

                rating: rating
            }

            const response = await axios.post(`${BASE_API_URL}/student/conseling_rating/${selectedConselingId}`,
                data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.status === true) {
                toast.success('Add New Rating')
                // fetchSession()
                navigate(0);

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error('Something wrong')
            // console.error('Error fetching data:', error);
        }
        setIsModalOpen(false)

    }

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '20%' },
            { id: 'time', name: 'Time', width: '20%' },
            { id: 'teacher', name: 'Teacher', width: '20%' },
            { id: 'category', name: 'category', width: '20%' },
            { id: 'rating', name: 'rating', width: '20%' },
            { id: 'status', name: 'Status', width: '20%' },
            { id: 'action', name: 'Action', width: '20%' },
        ];

        return (
            <thead className="">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={`min-w-[${column.width}] font-poppins text-left pl-2 lg:pr-20 sm:pr-0`}
                        >
                            {column.name}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderTableRow = (data) => {
        return (
            <tr key={data} className='space-y-1'>
                <td className="pl-2 font-poppins">{formatDate(data.date).formattedDate}</td>
                <td className="pl-2 font-poppins">{formatDate(data.date).formattedTime}</td>
                <td className="pl-2 font-poppins">{data.teacher_name}</td>
                <td className="pl-2 font-poppins">{data.category}</td>
                <td className="pl-2 font-poppins">{data.rating || "-"}</td>
                <td className="pl-2 font-poppins">{data.isclosed === 1 ? 'Closed' : 'Approved'}</td>
                <td className="px-2 flex items-center space-x-2">
                    <button
                        className={`sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base ${data.rating ? 'bg-green-500 cursor-not-allowed' : 'bg-[#6495ED]'
                            } text-white rounded font-poppins`}
                        onClick={() => handleResultButtonClick(data)}
                        disabled={data.rating ? true : false}
                    >
                        {data.rating ? 'Done' : 'Submit'}
                    </button>


                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <table className="max-w-fit table-auto text-base sticky top-0 z-10 font-poppins">
                {renderTableHeader()}
                <tbody>{history.map((item) => renderTableRow(item))}</tbody>
            </table>
        );
    };

    return (
        <div className="w-full h-screen bg-[#F9F9F9] overflow-hidden font-poppins">
            <Navbar />
            <ToastContainer />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-10 py-1 sm:px-14 md:px-32 lg:px-60 gap-4 font-poppins">
                <div className="w-full h-fit bg-white drop-shadow-lg py-12 gap-4 flex flex-col items-center justify-center font-poppins">
                    <h1 className="text-xl font-bold">Counseling History</h1>
                    <h1 className="text-base text-center">
                        Here your last counseling history, don’t forget to give a review.
                    </h1>
                    <div className="max-h-[200px] overflow-y-auto">
                        {renderTable()}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Result Modal"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
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
                            <h1 className='text-2xl font-poppins font-bold text-center'>Counseling Result</h1>
                            <form action="" className='pt-10 h-full'>
                                <label htmlFor="teacher" className='text-[#B72024]'>Name Teacher</label>
                                <input
                                    type="text"
                                    name="nis"
                                    value={selectedTeacher?.teacher_name}
                                    id="nis"
                                    className="w-full h-12 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex"
                                    readOnly
                                    disabled
                                />

                                <label htmlFor="rating" className='text-[#B72024] '>Please Submit Rating</label> <br />
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="#FFD700"
                                    starHoverColor="#FFD700"
                                    changeRating={(newRating) => setRating(newRating)}
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="60px"
                                    className=""
                                />

                                {/* <label htmlFor="id_conseling" className='text-[#B72024]'>ID Counseling</label>
                                <input
                                    type="text"
                                    name="id_conseling"
                                    value={selectedConselingId}
                                    id="id_conseling"
                                    className="w-full h-12 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex"
                                    readOnly
                                /> */}

                                <div className='mt-auto space-x-2 pt-2 flex'>
                                    <button className='px-4 py-1 bg-[#C0392B] text-white rounded' onClick={closeModal}>Close</button>
                                    <button className='px-4 py-1 bg-[#27AE60] text-white rounded' onClick={handleSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default SHistory;
