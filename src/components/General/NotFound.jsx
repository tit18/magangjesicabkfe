import React from "react";
import '../../index.css';

const NotFound = () => {

    const redirectToSupportLink = () => {
        // Mengarahkan pengguna ke link dukungan
        window.location.href = "https://sociabuzz.com/aliffakhrul/tribe";
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
            <div className="w-fit h-fit px-20 py-10 bg-[#B72024] rounded-xl flex flex-col items-center justify-center gap-6">
                <h1 className="text-white text-center font-bold text-5xl">ERROR 404</h1>
                <h1 className="text-white text-center pt-20 text-3xl font-semibold font-poppins">Yahhh, Page Yang Anda Cari Tidak Ada </h1>

                {/* <h1 className="text-white text-center text-2xl font-semibold font-poppins mt-10">Daripada Sedih Lebih Baik Traktir Kami😁</h1>
                <button className="bg-green-400 px-44 py-4 rounded-lg font-bold" onClick={redirectToSupportLink}>TEKAN DISINI YA</button> */}
            </div>
        </div>
    );
}

export default NotFound;
