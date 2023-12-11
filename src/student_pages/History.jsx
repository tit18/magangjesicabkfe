import React from "react";
import "../index.css";
import Navbar from "../components/General/Navbar";

const SHistory = () => {
    return (
        <div className="">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col items-center justify-center pt-6 px-52 gap-4">
                <div className="w-full h-fit bg-white  py-12 px-80 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold font-poppins mb-2 text-center">
                    Counseling History
                    </h1>
                    <p className="text-sm font-normal font-poppins mb-2 text-center">
                    Here your last counseing history, don’t forget to give review.
                    </p>
                </div>
            </div>
            
        </div>
            
        

    )
}

export default SHistory