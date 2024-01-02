import React from 'react';
import { FaEye } from "react-icons/fa";
const Card = (props) => {
  return (
    <div
      className="relative w-96 mx-auto overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transform hover:shadow-lg transition-transform duration-300"
      onClick={props.onClick}
    >
      <div className="relative h-72 overflow-hidden">
      <img
          src={props.image}
          alt={props.title}
          className="w-full h-full  transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 bg-lime-100">
        <p className="block text-lg font-extrabold w-full text-center text-lg font-bold pb-3 font-sans text-base font-semibold leading-relaxed text-blue-gray-900 antialiased">
          {props.title}
        </p>

        <button
          className="block w-full p-6 text-xl font-bold text-red-900  bg-gray-400 rounded-md focus:outline-none focus:shadow-outline-blue transform hover:scale-105 transition-transform duration-300"
          type="button"
        >
          <div className='flex align-middle gap-7 justify-center ali m-0 auto'>
            <span className=''>
          Show State Space Tree

            </span>
          <div>
          <FaEye className='mt-1 text-2xl' />

          </div>
          </div>
          

        </button>
      </div>
    </div>
  );
};

export default Card;
