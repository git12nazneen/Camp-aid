import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['camps'],
    queryFn: async () => {
      const response = await axiosSecure.get('/camps');
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
      <h2 className='text-center my-10 font-bold text-2xl mx-auto '>camps Register Camps</h2>
     

<div className="mx-20">
      </div>
      <div className="mx-20">
        <table className="table my-4">
          <thead className="bg-sky-400 py-3 text-white uppercase">
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Participate Name</th>
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
                  {item.campName}
                  </div>
                </td>
                {/* {new Date(date).toLocaleDateString().toLocaleTimeString()} */}
                <td><h1>{new Date(item.date).toLocaleString()}</h1></td>
                <td>{item.location}</td>
                <th>
                {item.professional_name}
                </th>
                <th>
                <FaTrash className="text-red-700" />
                </th>
                <th>  <button className="btn btn-xs">
                    <FaEdit className="text-red-700" />
                  </button></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default ManageCamp;
