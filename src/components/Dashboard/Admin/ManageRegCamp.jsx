
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageRegCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const queryClient = useQueryClient();

  const { data: participants = [], refetch } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Mutation for confirming status
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/payments/${id}/confirm`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("participants");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update status",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error confirming status:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating status",
        showConfirmButton: true,
      });
    },
  });

  // Handle confirm button click
  const handleConfirm = (id) => {
    confirmMutation.mutate(id);
  };

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
    <div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center my-10 font-bold text-2xl mx-auto">
          Participant Pay Camps {participants.length}
        </h2>
        <div className="mx-20">
          <table className="table my-4">
            <thead className="bg-sky-400 py-3 text-white uppercase">
              <tr>
                <th>#</th>
                <th>Participate Name</th>
                <th>Camp Name</th>
                <th>Camp Fees</th>
                <th>Payment Status</th>
                <th>Confirm Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {participants.length > 0 ? (
                participants.slice(startIndex, endIndex).map((item, idx) => (
                  <tr key={item._id}>
                    <td>{startIndex + idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.campName}</td>
                    <td>{item.price} $</td>
                    <td>
                      <button className="bg-sky-500 px-3 rounded-xl py-1">
                        {item.status}
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-black py-1 text-white text-center px-3 rounded-xl"
                        onClick={() => handleConfirm(item._id)}
                      >
                        <h1 className="bg-black py-1 text-white text-center px-3 rounded-xl">
                          {item.confirm}
                        </h1>
                      </button>
                    </td>
                    <td>
                      <FaTrash className="text-red-700" />
                    </td>
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
                <td colSpan="8" className="text-center py-10">
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
    </div>
  );
};

export default ManageRegCamp;
