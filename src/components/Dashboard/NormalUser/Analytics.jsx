import React from 'react';
import CampChart from '../NormalUser/CampChart';


const Analytics = () => {
    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='text-center py-14 text-2xl font-bold text-black'>Your register <span className='text-sky-500'>camps</span> analytics</h1>
         <CampChart></CampChart>
        </div>
    );
};

export default Analytics;