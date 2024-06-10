import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../../hook/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page
  const [paymentStatus, setPaymentStatus] = useState({}); // Payment status state

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const response = await axiosSecure.get("/participant");
      return response.data;
    },
    retry: false, // Disable automatic retries
    onError: (err) => {
      console.log("Error fetching participant data:", err);
    },
  });
console.log('participants', data)
  useEffect(() => {
    if (data) {
      const initialPaymentStatus = data.reduce((acc, item) => {
        acc[item._id] = item?.paymentStatus === "Paid";
        return acc;
      }, {});
      setPaymentStatus(initialPaymentStatus);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


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




  // Filter participants by logged-in user's email
  const participants = data.filter(
    (item) => item.participantEmail === user?.email
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredData = participants.filter((item) =>
    item.campName.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handlePaymentStatusChange = (itemId) => {
    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: true,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-center my-10 font-bold text-2xl mx-auto ">
        Participant Register Camps
      </h2>
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
            border: "1px solid #ccc",
          }}
        />
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
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.slice(startIndex, endIndex).map((item, idx) => (
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
                    {item?.status == "Paid" ? (
                      <button className="btn bg-red-500 cursor-not-allowed disabled opacity-50">
                        Paid
                      </button>
                    ) : (
                      <Link to={`/dashboard/payment/${item._id}`}>
                        <button
                          className="btn bg-sky-500 btn-outline"
                          onClick={() => handlePaymentStatusChange(item._id)}
                        >
                          Pay
                        </button>
                      </Link>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-black py-1 text-white text-center px-3 rounded-xl"
                      onClick={() => handleConfirm(item._id)}
                    >
                      {item.confirm}
                    </button>
                  </td>
                  <td>
                 {item?.status == 'Paid' ? (
                   <button
                   onClick={() => handleDelete(item._id)}
                   className="btn opacity-50 btn-xs" disabled
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
                  <Link to={`/dashboard/review/${item._id}`}>
                    <td className="items-center ">
                      {item?.status == 'Paid' && item?.confirm == 'Confirmed' ? (
                        <button className="btn bg-black  text-white mt-4 btn-xs" >
                        FeedBack
                        </button>
                      ) : (
                        <span className="text-center ">N/A</span>
                      )}
                    </td>
                  </Link>


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
  );
};

export default RegisterCamps;
