import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';

const RegisterCamps = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['participant'],
    queryFn: async () => {
      const response = await axiosSecure.get('/participant');
      return response.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-center my-10 font-bold text-2xl mx-auto '>Participant Register Camps</h2>
     

<div className="mx-20">
      </div>
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
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
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
                <td>${item.price}</td>
                <th>
                <button className="btn btn-xs">
                    <FaEdit className="text-red-700" />
                  </button>
                </th>
                <th>
                <FaTrash className="text-red-700" />
                </th>
                <th>*</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default RegisterCamps;
