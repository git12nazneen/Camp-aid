import React from "react";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
  const {
    location = '',
    professional_name,
    campName,
    date,
    price,
    guests,
    description,
    image,
    _id
  } = camp;
// console.log(camp)
  return (
    <div>
      <a
        class="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
        href="#"
      >
        <div class="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
          <img
            class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
            src={image}
          />
        </div>
        <div class="p-4 md:p-5">
          <h3 class="text-sm font-bold text-gray-800 dark:text-white">
           {campName}
          </h3>
          <p class="mt-1 text-gray-500 dark:text-neutral-400">
           {description}
          </p>
        </div>
        <div className="flex">
            <div className="flex-1"><p className="px-3 mx-3 rounded-lg py-2 bg-slate-300 font-light text-sm"> {camp.location}</p></div>
            <div className="flex-1"><p className="px-3 mx-3 rounded-lg py-2 bg-slate-300 font-light text-sm">Price:${price}</p></div>
        </div>
        <div className="flex ">
            <div className="flex-1"><p className="px-3 mt-3 mx-3 text-white rounded-lg py-2 bg-slate-600 font-light text-sm"> {professional_name}</p></div>
            <div className="flex-1 "><p className="px-3 mt-3 mx-3 rounded-lg text-white py-2 bg-slate-600 font-light text-sm">Participate: {guests} </p></div>
        </div>
        <div className="flex mr-1 my-3">
            <div className="flex-1"><p className="px-3 mx-3 rounded-lg py-2 bg-slate-300 font-light text-sm">Date :  {new Date(date).toLocaleString()} </p></div>
           <div>
           <Link to={`/camps/${_id}`}>
                <a className="btn btn-sm  btn-outline btn-info">Details</a>
                </Link>
            </div>
        </div>
      </a>
    </div>
  );
};

export default CampCard;
