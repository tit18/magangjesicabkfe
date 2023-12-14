// History.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { BASE_API_URL } from '../global';
import moment from 'moment/moment';
import NavbarTeacher from '../components/General/NavbarTeacher';
import { useNavigate } from 'react-router-dom';

const THistory = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]); // Added appointments state
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resultInput, setResultInput] = useState("");
    const [state] = useState({
        id_teacher: sessionStorage.getItem('id_teacher') || 0,
        token: sessionStorage.getItem('tokeen'),
    });



    const fetchDataTable = async () => {
        try {

            const response = await axios.get(`${BASE_API_URL}/teacher/conseling_history_teacher`, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });

            setAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };


    useEffect(() => {
        fetchDataTable();
    }, [state.id_teacher, state.token]);

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDate = momentDate.format('DD/MM/YYYY');
        const formattedTime = momentDate.format('HH:mm:ss');
        return { formattedDate, formattedTime };
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '25%' },
            { id: 'student', name: 'Student', width: '25%' },
            { id: 'category', name: 'Category', width: '25%' },
            { id: 'status', name: 'Status', width: '25%' },
            { id: 'result', name: 'Counseling Result', width: '30%' },
        ];

        return (
            <thead className="">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={`font-poppins text-left pl-4 lg:pr-20 sm:pr-0`}
                            style={{ width: column.width }}
                        >
                            <span className='whitespace-nowrap'>
                                {column.name}
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderTableRow = (data) => {
        return (
            <tr key={data.id_conseling} className='space-y-1'>
                <td className="pl-4 font-poppins">{formatDate(data.date).formattedDate}</td>
                <td className="pl-4 font-poppins">{data.student_name}</td>
                <td className="pl-4 font-poppins">{data.category}</td>
                <td className="pl-4 font-poppins">
                    {data.isclosed === 1 ? (
                        <span className="text-[#C0392B]">Closed</span>
                    ) : data.aproval === 1 ? (
                        <span className="text-[#27AE60]">Approved</span>
                    ) :
                        <span className="text-yellow-500">Waiting</span>
                    }
                </td>
                <td className="px-4 flex items-center space-x-2">
                    <button
                        className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#6495ED] text-white rounded font-poppins"
                        onClick={() => handleResultButtonClick(data)}
                    >
                        Details
                    </button>
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <div className="table-responsive max-w-full">
                <table className="table text-base sticky top-0 z-10 font-poppins">
                    {renderTableHeader()}
                    <tbody>{appointments.map((item) => renderTableRow(item))}</tbody>
                </table>
            </div>
        );
    };

    const handleResultButtonClick = (appointment) => {
        setSelectedAppointment(appointment);
        setResultInput(appointment.conseling_result || "");
        setIsModalOpen(true);
    };

    useEffect(() => {
        const tokenChangeHandler = () => {
            const newToken = sessionStorage.getItem('tokeen');
            const newIdTeacher = sessionStorage.getItem('id_teacher');

            if (newToken !== state.token || newIdTeacher !== state.id_teacher) {
                // Token changed, perform logout
                handleLogout();
            }
        };

        // Add listener for token changes
        window.addEventListener('storage', tokenChangeHandler);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('storage', tokenChangeHandler);
        };
    }, [state.token, state.id_teacher]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/teacher');
    };

    return (
        <div className="w-full h-full bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-y flex flex-col pt-10 py-1 sm:px-14 md:px-32 lg:px-60 gap-4 font-poppins">
                <div className="w-full h-[800px] bg-white drop-shadow-lg xl:px-32 lg:px-0 py-12 gap-4 flex flex-col font-poppins">
                    <h1 className="text-xl font-bold text-center">Counseling History</h1>
                    <h1 className="text-base text-center">
                        Here your last counseing history, don’t forget to give review.
                    </h1>
                    <div className="max-h-[400px] overflow-y-auto">
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
                            <form action="" className='pt-5 h-full'>
                                <label htmlFor="Student" className='text-[#B72024]'>Student</label>
                                <input
                                    type="text"
                                    name="nis"
                                    value={selectedAppointment?.student_name || ""} // Add conditional check
                                    id="nis"
                                    className="w-full h-12 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex"
                                    readOnly
                                />

                                <label htmlFor="Result" className='text-[#B72024]'>Counseling Result</label>
                                <textarea
                                    name=""
                                    id=""
                                    value={resultInput}
                                    cols="30"
                                    rows="10"
                                    readOnly
                                    className='w-full h-32 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex'>
                                </textarea>

                                <div className='mt-auto space-x-2 pt-2 flex'>
                                    <button className='px-4 py-1 bg-[#C0392B] text-white rounded' onClick={closeModal}>back</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>

        </div>
    );
};

export default THistory;
