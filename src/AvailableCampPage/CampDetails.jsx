
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching camp details for ID: ${id}`); 
      try {
        const response = await fetch(`http://localhost:5000/camps/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching camp details:', err);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  const {
    professional_name,
    campName,
    price,
    guests,
    description,
    image,
    location,
    date
  } = details;

  return (
    <div className='max-w-screen-lg mx-auto mt-32'>
      <div className='flex flex-col gap-6'>
        <div>
          <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
            <img
              className='object-cover w-full'
              src={image}
              alt='header image'
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
        <div className='col-span-4 flex flex-col gap-8'>
          <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
              <div>Doctor Name:  {professional_name}</div>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
              <div > <p className="rounded-lg bg-sky-500 px-3 text-black py-2"> Participant : {guests}</p> </div>
              <div>{price}$ Camp fees</div>
              <div>Campname:{campName}</div>
            

            </div>
            <div  className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            <div>Location  : {location}</div>
              <div>Date: {new Date(date).toLocaleDateString()}</div>
            </div>
          </div>
          <hr />
          <div className='text-lg font-light text-neutral-500'>
            {description}
          </div>
          <hr />
        </div>
        <div className='md:col-span-3 order-first md:order-last mb-10'>
          <button className="btn btn-sm btn-outline btn-info">Join Camp</button>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
