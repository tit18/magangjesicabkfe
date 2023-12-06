// AppointmentsTable.js
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

const AppointmentsTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(20);
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            date: '06 December 2023',
            time: '09.00',
            student: 'Bagus Imansyah',
        },
        // Add more data as needed
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <tr key={data.id}>
                <td className="pl-4 font-poppins">{data.date}</td>
                <td className="pl-4 font-poppins">{data.time}</td>
                <td className="pl-4 font-poppins">{data.student}</td>
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
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Result Modal">
                <h2>Result Modal</h2>
                <button onClick={closeModal}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default AppointmentsTable;
