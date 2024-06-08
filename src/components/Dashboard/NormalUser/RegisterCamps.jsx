import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import {  useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../hook/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page

  const { data, isLoading, error } = useQuery({
    queryKey: ["participants"],
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
  const participants = data.filter(
    (item) => item.participantEmail === user?.email
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(participants.length / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-center my-10 font-bold text-2xl mx-auto ">
        Participant Register Camps
      </h2>
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
              participants.slice(startIndex, endIndex).map((item, idx) => (
                <tr key={item._id}>
                  <td>{startIndex + idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      {item.participantName}
                    </div>
                  </td>
                  <td>
                    <h1>{item.campName}</h1>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <Link to={`/dashboard/payment/${item._id}`}>
                      <button className="btn bg-sky-500 btn-outline">
                        Pay
                      </button>
                    </Link>
                  </td>
                  <th>
                  <button
                        className="bg-black py-1 text-white text-center px-3 rounded-xl"
                        onClick={() => handleConfirm(item._id)}
                      >
                        <h1 className="bg-black py-1 text-white text-center px-3 rounded-xl">
                          {item.confirm}
                        </h1>
                      </button>
                  </th>
                  <th>
                    <FaTrash className="text-red-700" />
                  </th>

                  <th>Give review</th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No participant data found
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="8" className="text-center  py-10">
                <div className="pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`pagination-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      style={{
                        padding: "8px 12px",
                        margin: "0 4px",
                        border: "1px solid #ccc",
                        backgroundColor:
                          currentPage === index + 1 ? "blue" : "transparent",
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

export default RegisterCamps;
