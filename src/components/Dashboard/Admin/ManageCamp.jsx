import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['camps'],
    queryFn: async () => {
      const response = await axiosSecure.get('/camps');
      return response.data;
    }
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            position: "center",
            icon: "success",
            // title: `${item.name} has been deleted!`,
            title: "Delete camp success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-center my-10 font-bold text-2xl mx-auto '>Admin Register Camps</h2>
     

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
              <th>Doctor Name</th>
              <th>Cancel</th>
              <th>Update  Status</th>
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
                  <button onClick={() => handleDelete(item)}>

                      <FaTrash className="text-red-700" />
                  </button>
                </th>
                <th>  <button className="btn btn-xs">
                    <FaEdit className="text-sky-700" />
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
