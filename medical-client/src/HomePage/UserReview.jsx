import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../components/Dashboard/NormalUser/ReviewCard";

const UserReview = () => {
    const axiosSecure = useAxiosSecure()


    const {data : reviews = [] , refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/reviews')
            return res.data
        }
    })
    console.log('reviewwwww', reviews)
  return (
    <div className=" max-w-5xl mx-auto my-10">
      <div className="overflow-x-hidden">
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          What our <span class="text-sky-400 ">clients</span> say
        </h1>
        <p class="max-w-2xl mx-auto mt-6 text-center text-gray-500 dark:text-gray-300">
        Briefly describe the project you worked on for the client. Include any challenges you encountered and how you overcame them. Highlight specific achievements or successes.Add any final thoughts or comments you have about the client or the project
        </p>
      </div>

      <ReactSwiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay,  Navigation]}
        breakpoints={{
          350: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
      >
        {reviews.map((singleReview) => (
          <SwiperSlide key={singleReview._id}>
            <ReviewCard singleReview={singleReview} />
          </SwiperSlide>
        ))}
      </ReactSwiper>

    
    </div>
  );
};

export default UserReview;
