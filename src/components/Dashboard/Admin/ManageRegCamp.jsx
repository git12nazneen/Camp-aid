import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageRegCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const { data: filteredData = [], refetch } = useQuery({
    queryKey: ["filteredData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/participant");
      return res.data;
    },
  });
  // console.log('filter data', filteredData)
  const confirmMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/participant/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["filteredData"]);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error(
        "Error confirming status:",
        error.response?.data || error.message
      );
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating status",
        text: error.response?.data?.message || error.message,
        showConfirmButton: true,
      });
    },
  });

  const handleConfirm = (id) => {
    console.log("Confirming participant ID:", id);
    confirmMutation.mutate(id);
  };




  // delete id 

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/participant/${userId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };




  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteresData = filteredData.filter(
    (item) =>
      item.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(item.date)
        .toLocaleString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.professional_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteresData.length / perPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center my-10 font-bold text-2xl mx-auto">
          Participant Pay Camps {filteresData.length}
        </h2>
        <div className="mx-20 flex">
          <div>
            <h1 className="bg-black text-white text-center px-5 py-3">
              Search
            </h1>
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
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className="mx-20">
          <table className="table my-4">
            <thead className="bg-sky-400 py-3 text-white uppercase">
              <tr>
                <th>#</th>
                <th>Participant Name</th>
                <th>Camp Name</th>
                <th>Camp Fees</th>
                <th>Payment Status</th>
                <th>Confirm Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteresData.length > 0 ? (
                filteresData.slice(startIndex, endIndex).map((item, idx) => (
                  <tr key={item._id}>
                    <td>{startIndex + idx + 1}</td>
                    <td>{item.participantName}</td>
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
                    {/* {item?.confirm == 'Confirmed' && item.status == 'Paid' && ()} */}
                   {item?.confirm == 'Confirmed' && item?.status == 'Paid' ? (
                      <button
                      onClick={() => handleDelete(item._id)}
                      className="btn opacity-45 btn-xs" disabled
                      >
                     <FaTrash className="text-red-700" />
                      </button>
                   ) : (
                    <button
                    onClick={() => handleDelete(item._id)}
                    className="btn  btn-xs"
                    >
                   <FaTrash className="text-red-700" />
                    </button>
                   )}
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
