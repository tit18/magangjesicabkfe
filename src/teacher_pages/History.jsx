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
        const formattedDate = momentDate.format('DD/MM');
        const formattedTime = momentDate.format('HH:mm');
        return { formattedDate, formattedTime };
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '20%' },
            { id: 'time', name: 'Time', width: '20%' },
            { id: 'student', name: 'Student', width: '20%' },
            { id: 'category', name: 'Category', width: '20%' },
            { id: 'status', name: 'Status', width: '20%' },
            { id: 'result', name: 'Result', width: '20%' },
        ];

        return (
            <thead className="">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={`font-poppins text-left pl-2  sm:pr-0`}
                            style={{ width: column.width }}
                        >
                            <span className='whitespace-nowrap md:text-base xs:text-sm font-poppins'>
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
                <td className="pl-2 font-poppins md:text-base xs:text-sm">{formatDate(data.date).formattedDate}</td>
                <td className="pl-2 font-poppins md:text-base xs:text-sm">{formatDate(data.date).formattedTime}</td>
                <td className="pl-2 font-poppins md:text-base xs:text-sm">{data.student_name}</td>
                <td className="pl-2 font-poppins md:text-base xs:text-sm">
                    {data.category === "online" ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">online</span>
                    ) :
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">offline</span>
                    }
                </td>
                <td className="pl-2 font-poppins md:text-base xs:text-sm">
                    {data.isclosed === 1 ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Closed</span>
                    ) : data.aproval === 1 ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Approved</span>
                    ) :
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Waiting</span>
                    }
                </td>
                <td className="px-2">
                    <button
                        className="xs:px-1 xs:py-1 sm:px-1 md:px-3 lg:px-5 py-0 bg-[#6495ED] text-white rounded font-poppins"
                        onClick={() => handleResultButtonClick(data)}
                    >
                        <h1 className='xs:text-xs md:text-sm lg:text-base'>
                            Details
                        </h1>
                    </button>
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <div className="max-w-full">
                <table className="table table-auto text-base sticky top-0 z-10 font-poppins">
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
        <div className="w-full h-screen bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-y flex flex-col pt-5 py-1 sm:px-14 md:px-32 lg:px-52 gap-4 font-poppins">
                <div className="w-full h-fit bg-white drop-shadow-lg lg:px-44 md:px-30 sm:px-7 xs:px-2 py-12 gap-4 flex flex-col font-poppins">
                    <h1 className="text-xl font-bold text-center">Counseling History</h1>
                    <h1 className="text-base text-center">
                        Here your last counseing history, don’t forget to give review.
                    </h1>
                    <div className="max-h-[400px] overflow-y-auto pt-10">
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
