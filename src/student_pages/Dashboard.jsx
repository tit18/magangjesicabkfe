import React from "react";
import "../index.css";
import Navbar from '../components/General/Navbar';

const SDashboard = () => {
    
    return (
        <div className="">
            <Navbar />
            <div className="text-left">
                <div>
                    <span className="text-red-700 text-sm font-medium font-Poppins leading-normal">CURHApps</span>
                    <span className="text-black text-xs font-normal font-Poppins leading-normal">, </span>
                    <span className="text-black text-sm font-normal font-Poppins leading-normal">
                        a counseling service both offline and online at SMK Telkom Malang,<br />
                        aims to provide guidance and counseling support to students through the collaboration<br />
                        with counseling teachers, the students' trusted companions. Please be on time.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SDashboard;
