import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarTeacher from '../components/General/NavbarTeacher';
import AppointmentsTable from '../components/component-teacher/Appointment/AppointmentTable';
import axios from 'axios';
import { BASE_API_URL } from '../global';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const TAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const [state] = useState({
        id_teacher: sessionStorage.getItem('id_teacher') || 0,
        token: sessionStorage.getItem('tokeen'),
    });


    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/teacher/appointment`, {
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
        fetchData();
    }, [state.id_teacher, state.token]);

    const formatDateOK = (date) => {
        const momentDate = moment(date);
        const formattedDate = momentDate.format('DD/MM/YYYY');
        const formattedTime = momentDate.format('HH:mm:ss');
        return { formattedDate, formattedTime };
    };

    const handleApprove = async (idConseling) => {
        try {

            const response = await axios.put(
                `${BASE_API_URL}/teacher/approve/${idConseling}`,
                null, // Data is set to null since it's a PUT request
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );

            console.log(response.data.status);

            if (response.data.status === true) {
                toast.success('Approved successfully!');
                navigate(0);
            }
        } catch (error) {
            console.error('Error approving appointment:', error);
            // TODO: Handle error if needed
        }
    };

    const handleReject = async (idConseling) => {
        try {
            const response = await axios.put(
                `${BASE_API_URL}/teacher/reject/${idConseling}`,
                null, // Data is set to null since it's a PUT request
                {
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                }
            );

            console.log(response.data.status);

            if (response.data.status === true) {
                toast.success('Rejected successfully!');
                navigate(0);
            }
        } catch (error) {
            console.error('Error rejecting appointment:', error);
            // TODO: Handle error if needed
        }
    };

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '120px', },
            { id: 'student', name: 'Student', width: '150px' },
            { id: 'action', name: 'Action', width: '80px' },
        ];

        return (
            <thead className="">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={`min-w-[${column.width}] font-poppins text-left pl-4 lg:pr-20 sm:pr-0`}
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
                <td className="pl-4 font-poppins">{formatDateOK(data.offline.meeting_date).formattedDate}</td>
                <td className="pl-4 font-poppins">{data.student.student_name}</td>
                <td className="px-4 flex items-center justify-center align-middle space-x-2">
                    <button onClick={() => handleApprove(data.id_conseling)} className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#339900] text-white rounded font-poppins">Approve</button>
                    <button onClick={() => handleReject(data.id_conseling)} className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#B72024] text-white rounded font-poppins">Reject</button>
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <table className="max-w-[800px] table-auto text-base sticky top-0 z-10 font-poppins">
                {renderTableHeader()}
                <tbody>
                    {appointments && appointments.length > 0 ? (
                        appointments.map((item) => renderTableRow(item))
                    ) : (
                        <tr>
                            <td colSpan="4" className="pl-4 font-poppins text-center">
                                No appointments available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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
        <div className="w-full h-screen bg-[#F9F9F9] overflow-hidden font-poppins">
            <NavbarTeacher />
            <div className="overflow-x-auto overflow-y flex flex-col items-center justify-center pt-10 sm:px-14 md:px-32 lg:px-60 gap-4 font-poppins">
                <div className="w-full h-fit bg-white drop-shadow-lg py-12 gap-4 flex flex-col items-center justify-center">
                    <ToastContainer />
                    <h1 className="text-xl font-bold">Appointment Request</h1>
                    <h1 className="text-base text-center">
                        The following data is a list of students who have requested appointments for offline counseling.
                    </h1>
                    <div className="max-h-[200px] overflow-y-auto">
                        {renderTable()}
                    </div>
                </div>
                <AppointmentsTable />
                <div></div>
            </div>
        </div>
    );
};

export default TAppointment;
