import React, { Component } from 'react';
import Navbar from '../components/General/Navbar';
import AppointmentsTable from '../components/Appointment/AppointmentTable';

class TAppointment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            itemsPerPage: 5,
            totalItems: 20,
            appointments: [
                {
                    id: 1,
                    date: '06 December 2023',
                    student: 'Marsya Timotiandoandoa jaoidjoa djoa poah pioa',
                    status: 'Waiting',
                },

                // Add more data as needed
            ],
        };
    }

    handleResultButtonClick = () => {
        // Handle the result button click here
    };

    handlePageChange = (selected) => {
        this.setState({ currentPage: selected.selected });
        // Fetch data for the new page from the backend
        // Example: fetchAppointments(selected.selected + 1).then((data) => this.setState({ appointments: data }));
    };

    renderTableHeader() {
        const columns = [
            { id: 'date', name: 'Date', width: '120px' },
            { id: 'student', name: 'Student', width: '150px' },
            { id: 'status', name: 'Status', width: '120px' },
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
    }

    renderTableRow(data) {
        return (
            <tr key={data.id}>
                <td className="pl-4 font-poppins">{data.date}</td>
                <td className="pl-4 font-poppins">{data.student}</td>
                <td className="pl-4 font-poppins">{data.status}</td>
                <td className="px-4 flex items-center justify-center align-middle space-x-2">
                    <button className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#339900] text-white rounded font-poppins">Approve</button>
                    <button className="sm:px-1 md:px-3 lg:px-5 py-1 sm:text-xs md:text-sm lg:text-base bg-[#B72024] text-white rounded font-poppins">Reject</button>
                </td>
            </tr>
        );
    }

    renderTable() {
        return (
            <table className="max-w-fit table-auto text-base sticky top-0 z-10 font-poppins">
                {this.renderTableHeader()}
                <tbody>{this.state.appointments.map((item) => this.renderTableRow(item))}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="w-full h-screen bg-[#F9F9F9] overflow-hidden font-poppins">
                <Navbar />
                <div className="overflow-x-auto overflow-y-auto flex flex-col items-center justify-center pt-6 sm:px-14 md:px-32 lg:px-60 gap-4 font-poppins">
                    <div className="w-full h-fit bg-white drop-shadow-lg py-12 gap-4 flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold">Appointment Request</h1>
                        <h1 className="text-base text-center">
                            The following data is a list of students who have requested appointments for offline counseling.
                        </h1>
                        {this.renderTable()}
                    </div>
                    <AppointmentsTable
                        appointments={this.state.appointments}
                        handleResultButtonClick={this.handleResultButtonClick}
                        handlePageChange={this.handlePageChange}
                        totalItems={this.state.totalItems}
                        itemsPerPage={this.state.itemsPerPage}
                    />
                    <div></div>
                </div>
            </div>
        );
    }
}

export default TAppointment;
