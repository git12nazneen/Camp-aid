import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

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
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
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

  // Function to handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(item.date).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.professional_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredData.length / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className='max-w-5xl mx-auto'>
      <h2 className='text-center my-10 font-bold text-2xl mx-auto '>Admin Register Camps</h2>
      
      <div className="mx-20 flex">
        <div>
          <h1 className="bg-black text-white text-center px-5 py-3">Search</h1>
        </div>
        <input
          type="text"
          placeholder="Search by Camp Name, Date, or Healthcare Professional"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
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
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(startIndex, endIndex).map((item, idx) => (
              <tr key={item._id}>
                <td>{startIndex + idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    {item.campName}
                  </div>
                </td>
                <td><h1>{new Date(item.date).toLocaleString()}</h1></td>
                <td>{item.location}</td>
                <td>{item.professional_name}</td>
                <td>
                  <button onClick={() => handleDelete(item)}>
                    <FaTrash className="text-red-700" />
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/updateCamp/${item._id}`}>
                    <button className="btn btn-xs">
                      <FaEdit className="text-sky-700" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8" className="text-center py-10">
                <div className="pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`pagination-item ${currentPage === index + 1 ? "active" : ""}`}
                      style={{
                        padding: "8px 12px",
                        margin: "0 4px",
                        border: "1px solid #ccc",
                        backgroundColor: currentPage === index + 1 ? "blue" : "transparent",
                        color: currentPage === index + 1 ? "#fff" : "#333",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;