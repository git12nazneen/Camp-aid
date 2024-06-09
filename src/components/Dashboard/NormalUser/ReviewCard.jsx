import React from "react";
import useAuth from "../../../hook/useAuth";
import avatar from '../../../../src/assets/avatar.png'
const ReviewCard = ({ singleReview }) => {
  const { user } = useAuth();
  const { name, rating, comment, startDate } = singleReview;
  console.log(singleReview);
  return (
    <div>
      <section className="my-8  text-gray-800">
        <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
          <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
            <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 bg-gray-100">
              <p className="relative px-6 py-1 text-lg italic text-center text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-8 h-8 text-sky-600"
                >
                  <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                  <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                </svg>
                View and manage participant registrations, ensuring smooth check-in and check-out processes.
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="absolute right-0 w-8 h-8 text-sky-600"
                >
                  <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                  <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                </svg>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-sky-600 text-gray-50">
              {/* <img src="https://source.unsplash.com/50x50/?portrait?1" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center rounded-full bg-gray-500 bg-gray-300" /> */}
            
             {/* <img 
                class="rounded-full w-14 h-14"
                src={avatar}
                alt=""
              /> */}
              <p className="text-xl font-semibold leading-tight">
                Take service{" "}
              </p>
              <p className="text-sm uppercase">{name}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewCard;