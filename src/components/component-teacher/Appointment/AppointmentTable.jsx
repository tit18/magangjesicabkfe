// AppointmentsTable.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { BASE_API_URL } from '../../../global';
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AppointmentsTable = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]); // Added appointments state
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState("");
    const [state] = useState({
        id_teacher: sessionStorage.getItem('id_teacher') || 0,
        token: sessionStorage.getItem('tokeen'),
    });


    const fetchDataTable = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/offline/appointment`, {
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

    const handleResultButtonClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (result !== "") {
            try {
                const response = await axios.post(
                    `${BASE_API_URL}/result/insertresult/${selectedAppointment.id_conseling}`,
                    { conseling_result: result },
                    {
                        headers: {
                            Authorization: `Bearer ${state.token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    closeModal();
                    toast.success('Result has been successfully submitted!')

                    // Fetch the updated table data after successful submission
                    fetchDataTable();
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to submit result. Please try again.')
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '25%' },
            { id: 'time', name: 'Time', width: '25%' },
            { id: 'student', name: 'Student', width: '30%' },
            { id: 'action', name: 'Action', width: '20%' },
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
                            {column.name}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const renderTableRow = (data) => {
        return (
            <tr key={data.id_conseling} className='space-y-1'>
                <td className="pl-4 font-poppins">{formatDate(data.offline.meeting_date).formattedDate}</td>
                <td className="pl-4 font-poppins">{formatDate(data.offline.meeting_date).formattedTime}</td>
                <td className="pl-4 font-poppins">{data.student.student_name}</td>
                <td className="px-4 flex items-center space-x-2">
                    <button
                        className="sm:px-1 md:px-3 lg:px-5 sm:py-0 lg:py-1 bg-[#6495ED] text-white rounded font-poppins"
                        onClick={() => handleResultButtonClick(data)}
                    >
                        <h1 className='sm:text-xs md:text-sm lg:text-base'>
                            Result
                        </h1>
                    </button>
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <div className="table-responsive max-w-full overflow-x-auto">
                <table className="table text-base sticky top-0 z-10 font-poppins">
                    {renderTableHeader()}
                    <tbody>{appointments.map((item) => renderTableRow(item))}</tbody>
                </table>
            </div>
        );
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
        <div className="w-full h-fit bg-white drop-shadow-lg py-12 gap-4 flex flex-col items-center justify-center font-poppins">
            <ToastContainer />
            <h1 className="text-xl font-bold">Counseling Data</h1>
            <h1 className="text-base text-center">
                The following data is a list of students who have requested appointments for offline counseling.
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
                    <form action="" className='pt-5 h-full' onSubmit={handleSubmit}>
                        <label htmlFor="Student" className='text-[#B72024]'>Student</label>
                        <input
                            type="text"
                            name=""
                            value={selectedAppointment ? selectedAppointment.student.student_name : ''}
                            id="nis"
                            className="w-full h-12 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex"
                            readOnly
                        />

                        <label htmlFor="Result" className='text-[#B72024]'>Counseling Result</label>
                        <textarea
                            name=""
                            id=""
                            placeholder='Text Area'
                            cols="30"
                            rows="10"
                            onChange={(e) => setResult(e.target.value)}
                            className='w-full h-32 px-2 py-3 bg-white border-2 focus:border-black justify-start items-center inline-flex'>
                        </textarea>

                        <div className='mt-auto space-x-2 pt-2 flex'>
                            <button className='px-4 py-1 bg-[#C0392B] text-white rounded' onClick={closeModal}>Close</button>
                            <button className='px-4 py-1 bg-[#27AE60] text-white rounded' type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AppointmentsTable;
