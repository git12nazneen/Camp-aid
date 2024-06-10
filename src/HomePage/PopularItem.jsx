

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CampCard from "../AvailableCampPage/CampCard";

const PopularItem = () => {
  const {
    isLoading,
    error,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await fetch("https://server-two-sage-80.vercel.app/camps");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Sort camps by guests in descending order
  const sortedCamps = camps.slice().sort((a, b) => b.guests - a.guests);

  // Top 6 camps
  const top6Camps = sortedCamps.slice(0, 6);

  return (
    <div className="mx-10 lg:mt-32 mb-10">
      <div className="mx-auto text-center mb-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          Camp with Highest Participants
          <br /> Top 6 <span className="text-blue-500">Popular Camps</span>{" "}
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5">
        {top6Camps.map((camp) => (
          <CampCard key={camp._id} camp={camp} />
        ))}
      </div>
    </div>
  );
};

export default PopularItem;
