// Dashboard.jsx
import React from 'react';
import NavbarTeacher from '../components/General/NavbarTeacher';
import '../index.css';

const TDashboard = () => {
    return (
        <div className="w-full overflow-hidden">
            <NavbarTeacher /> {/* Include the Navbar component */}
            <div className="flex flex-col items-center justify-center pt-6 sm:px-10 md:px-32 lg:px-52 gap-4">
                <div className="w-full h-fit bg-white shadow-lg py-12 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold font-poppins">Dashboard</h1>
                    <p className="text-base font-poppins">
                        Welcome to the CURHApps Dashboard. This is your central hub for managing various aspects of the application.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Sample Card 1 */}
                        <div className="bg-blue-200 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-2">Total Appointments</h2>
                            <p className="text-lg">120</p>
                        </div>

                        {/* Sample Card 2 */}
                        <div className="bg-green-200 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-2">Pending Approvals</h2>
                            <p className="text-lg">25</p>
                        </div>

                        {/* Sample Card 3 */}
                        <div className="bg-yellow-200 p-4 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-2">Today's Schedule</h2>
                            <p className="text-lg">10 Appointments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TDashboard;
