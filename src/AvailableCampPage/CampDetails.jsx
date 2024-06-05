


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";

const CampDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

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

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {},
  });

  const { mutateAsync } = useMutation({
    mutationFn: async campData => {
      const { data } = await axiosSecure.post(`/participant`, campData);
      return data;
    },
    onSuccess: () => {
      console.log('Data Saved Successfully');
      toast.success('Camp Added Successfully!');
      navigate('/dashboard/registerCamps');
      setLoading(false);
    },
  });

    const updateParticipant = async () =>{
      fetch (`http://localhost:5000/camps/${id}`,{
        method:'PUT',
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log('Count increase', data);
      })
      .catch((error)=>{
        console.log('Adding error', error)
      })
    }

  const onSubmit = async (data) => {
    const mergedData = {
      ...data,
      campName: details.campName,
      price: details.price,
      location: details.location,
      professional_name: details.professional_name,
      participantName: user?.displayName,
      participantEmail: user?.email,
    };
    console.log(mergedData);

    setLoading(true);
    try {
      await mutateAsync(mergedData);
      await updateParticipant(); // Call the handleParticipantJoin function
    } catch (error) {
      setLoading(false);
    }
  };

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
    date,
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
              <div>Doctor Name: {professional_name}</div>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
              <div>
                <p className="rounded-lg bg-sky-500 px-3 text-black py-2">Participant: {guests}</p>
              </div>
              <div>{price}$ Camp fees</div>
              <div>Campname: {campName}</div>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
              <div>Location: {location}</div>
              <div>Date: {new Date(date).toLocaleString()}</div>
            </div>
          </div>
          <hr />
          <div className='text-lg font-light text-neutral-500'>
            {description}
          </div>
          <hr />
        </div>
        <div className='md:col-span-3 order-first md:order-last mb-10'>
          <button className="btn btn-sm btn-outline btn-info" onClick={toggleModal}>
            Join Camp
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={toggleModal}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                    Join Camp
                  </h3>
                </div>
              </div>
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Camp Name</label>
                  <input
                    type="text"
                    value={campName}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Camp Fees</label>
                  <input
                    type="text"
                    value={`${price}$`}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={location}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Healthcare Professional Name</label>
                  <input
                    type="text"
                    value={professional_name}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Participant Name</label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Participant Email</label>
                  <input
                    type="text"
                    value={user?.email}
                    readOnly
                    className="block w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    {...register("age", { required: "Age is required" })}
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md"
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone number is required" })}
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                  <input
                    type="tel"
                    {...register("emergencyContact", { required: "Emergency contact is required" })}
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-md"
                  />
                  {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact.message}</p>}
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
