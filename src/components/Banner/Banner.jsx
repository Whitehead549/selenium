import React from 'react';
import TravelImg from "../../assets/travelbox.jpeg";

const Banner = () => {
  return (
    <div className='main-h-[330px] bg-gray-200'>
      <div className=" container min-h-[220px] flex justify-center items-center backdrop-blur-xl py-6 sm:py-0">
        <div className='mx-auto'>
          {/* image section */}
          <div className="w-full h-full overflow-hidden">
            <img src={TravelImg} alt="Travel" className="object-fill w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
