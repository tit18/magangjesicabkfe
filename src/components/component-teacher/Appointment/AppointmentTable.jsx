// AppointmentsTable.js
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import axios from 'axios';
import { BASE_API_URL } from '../../../global';
import moment from 'moment/moment';

const AppointmentsTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(20);
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDataTable = async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/offline/appointment`);

            setAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchDataTable();
    }, []);

    const formatDate = (date) => {
        const momentDate = moment(date);
        const formattedDate = momentDate.format('DD/MM/YYYY');
        const formattedTime = momentDate.format('HH:mm:ss');
        return { formattedDate, formattedTime };
    };

    const handleResultButtonClick = () => {
        // Handle the result button click here
        // For example, open the modal
        setIsModalOpen(true);
    };

    const handlePageChange = (selected) => {
        setCurrentPage(selected.selected);
        // Fetch data for the new page from the backend
        // Example: fetchAppointments(selected.selected + 1).then((data) => setAppointments(data));
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderTableHeader = () => {
        const columns = [
            { id: 'date', name: 'Date', width: '120px' },
            { id: 'time', name: 'Time', width: '150px' },
            { id: 'student', name: 'Student', width: '120px' },
            { id: 'action', name: 'Action', width: '80px' },
        ];

        return (
            <thead className="">
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.id}
                            scope="col"
                            className={`min-w-[${column.width}] font-poppins text-left pl-4`}
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
            <tr key={data.id_conseling}>
                <td className="pl-4 font-poppins">{formatDate(data.offline.meeting_date).formattedDate}</td>
                <td className="pl-4 font-poppins">{formatDate(data.offline.meeting_date).formattedTime}</td>
                <td className="pl-4 font-poppins">{data.student.student_name}</td>
                <td className="px-4 flex items-center space-x-2">
                    <button className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#6495ED] text-white rounded font-poppins" onClick={handleResultButtonClick}>
                        Result
                    </button>
                </td>
            </tr>
        );
    };

    const renderTable = () => {
        return (
            <table className="max-w-fit table-auto text-base sticky top-0 z-10 font-poppins">
                {renderTableHeader()}
                <tbody>{appointments.map((item) => renderTableRow(item))}</tbody>
            </table>
        );
    };

    return (
        <div className="w-full h-fit bg-white drop-shadow-lg py-12 gap-4 flex flex-col items-center justify-center font-poppins">
            <h1 className="text-xl font-bold">Counseling Data</h1>
            <h1 className="text-base text-center">
                The following data is a list of students who have requested appointments for offline counseling.
            </h1>
            {renderTable()}
            <div className=" max-w-5xl gap-4 flex items-center justify-between font-poppins">
                {/* Flex Container 1 (Left-aligned) */}
                <div className="flex gap-2 items-center font-poppins">
                    <p className="font-medium">View</p>
                    <select className="font-medium text-sm p-2 bg-gray-50 border border-gray-300 font-poppins">
                        <option value="1">5</option>
                        <option value="2">10</option>
                        <option value="3">20</option>
                    </select>
                    <p>data per page</p>
                </div>

                {/* Flex Container 2 (Center-aligned) */}
                <div className="flex items-center font-poppins">
                    <p className="font-medium">
                        Showing 1 to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} entries
                    </p>
                </div>

                {/* Pagination */}
                <ReactPaginate
                    pageCount={Math.ceil(totalItems / itemsPerPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                    previousLabel={<i className="fas fa-chevron-left">o</i>}
                    nextLabel={<i className="fas fa-chevron-right">p</i>}
                />
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
                        width: '35%', 
                        height: '50%',
                        margin: 'auto',
                        borderRadius: '20px',
                    },
                }}
            >
                    <div className='flex flex-col p-6'>
                        <h1 className='text-2xl font-poppins font-bold'>Conceling Result</h1>
                        <form action="">
                            <label htmlFor="Student">Student</label>
                            <input type="text" />
                        </form>
                    </div>
            </Modal>

        </div>
    );
};

export default AppointmentsTable;
