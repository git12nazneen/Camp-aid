import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CampCard from "./CampCard";

const AvailableCampPage = () => {


    const { isLoading, error, data: camps } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
          const res = await fetch('http://localhost:5000/camps');
          return res.json();
        }
      });
    
      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
    

    return (
        <div className="mx-10 mt-32 mb-10">
     
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-5">
                {camps.map((camp)=>(
                    <CampCard key={camp._id}
                    camp={camp}
                    ></CampCard>
                ))}
            </div>
        </div>
    );
};

export default AvailableCampPage;