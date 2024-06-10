import React from 'react';
import commonImg from '../assets/abourt/head.jpg'

const HeadAvailable = () => {
    return (
        <div>
            
        <div>
          <div className="hero min-h-64" style={{backgroundImage: `url(${commonImg})`}}>
                <div className="hero-overlay bg-black bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-sm">
                    <h1 data-aos="fade-down"  data-aos-duration="2000" className="mb-5 text-5xl font-bold">Available  Camp</h1>
                    </div>
                </div>
             </div>
        </div>
   
        </div>
    );
};

export default HeadAvailable;