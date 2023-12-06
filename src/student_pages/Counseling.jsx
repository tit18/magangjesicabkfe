import React from "react";
import "../index.css";
import Navbar from "../components/General/Navbar";
import foto1 from '../components/icon/fotoTeacher.png'

const SCounseling = () => {
    return (
        <div className="">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-col items-center justify-center pt-6 px-52 gap-4">
                <div className="w-full h-fit bg-white  py-12 px-80 gap-4 flex flex-col items-center justify-center">
                    <h1 className="text-black text-xl font-bold font-poppins leading-normal">CURHApps Online Counseling</h1>
                    <h1 className="text-black text-xs font-normal font-poppins leading-normal">Here is a list of teachers available for online counseling; please choose one. </h1>
                    <div className=" w-full h-fit bg-white  py-12 px-80 gap-4 flex flex-col items-center justify-center">w
                        <div className="w-[306px] h-[150px] bg-white shadow" >
                        <img className="w-[73px] h-[110px]" src={foto1} alt="" />
                        <h1 className="text-red-700 text-sm font-medium font-['Poppins'] leading-normal">Jessica Rahma, S.Psi</h1>
                        <h1 className="text-black text-sm font-normal font-['Poppins'] leading-normal">counseling teacher</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SCounseling