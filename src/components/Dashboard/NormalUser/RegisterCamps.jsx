

import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../../../hook/useAuth';
import { Link } from 'react-router-dom';

const RegisterCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['participants'],
    queryFn: async () => {
      const response = await axiosSecure.get(`/participant`);
      return response.data;
    },
    retry: false, // Disable automatic retries
    onError: (err) => {
      console.log("Error fetching participant data:", err);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter participants by logged-in user's email
  const participants = data.filter(item => item.participantEmail === user?.email);

  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-center my-10 font-bold text-2xl mx-auto '>Participant Register Camps</h2>
      <div className="mx-20">
        <table className="table my-4">
          <thead className="bg-sky-400 py-3 text-white uppercase">
            <tr>
              <th>#</th>
              <th>Participate Name</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Confirm Status</th>
              <th>Cancel</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((item, idx) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask w-12 h-12">
                          {item.participantName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><h1>{item.campName}</h1></td>
                  <td>
                    <Link to={`/dashboard/payment/${item._id}`}>
                      <button className="btn bg-sky-500 btn-outline">Pay</button>
                    </Link>
                  </td>
                  <th>
                    <button className="btn btn-xs">
                      <FaEdit className="text-red-700" />
                    </button>
                  </th>
                  <th>
                    <FaTrash className="text-red-700" />
                  </th>
                  <th>*</th>
                  <th>Give review</th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No participant data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterCamps;
