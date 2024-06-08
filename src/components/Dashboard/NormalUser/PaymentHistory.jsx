import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(payments.length / perPage);

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
        Participant Pay Camps {payments.length}
      </h2>
      <div className="mx-20">
        <table className="table my-4">
          <thead className="bg-sky-400 py-3 text-white uppercase">
            <tr>
              <th>#</th>
              <th>Participate Name</th>
              <th>Camp Name</th>
              <th>Date</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirm Status</th>
             
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.slice(startIndex, endIndex).map((item, idx) => (
                <tr key={item._id}>
                  <td>{startIndex + idx + 1}</td>
                  <th>{item.name}</th>
                  <th>{item.campName}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      {new Date(item.date).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <h1>{item.price} $</h1>
                  </td>
                  <td>
                    <h1 className="bg-black px-3 py-1 text-white rounded-xl text-center">{item.status}</h1>
                  </td>
                  <td> <h1 className="bg-sky-200 px-3 py-1  rounded-xl text-center">{item.confirm}</h1></td>

                 
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

export default PaymentHistory;
