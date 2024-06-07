// import React from "react";
// import useAxiosSecure from "../../../hook/useAxiosSecure";
// import useAuth from "../../../hook/useAuth";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const ManageRegCamp = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: participant = [] } = useQuery({
//     queryKey: ["participant"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/participant}`);
//       return res.data;
//     },
//   });

//   return (
//     <div>
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-center my-10 font-bold text-2xl mx-auto ">
//           Participant Pay Camps {participant.length}
//         </h2>
//         <div className="mx-20">
//           <table className="table my-4">
//             <thead className="bg-sky-400 py-3 text-white uppercase">
//               <tr>
//                 <th>#</th>
//                 <th>Participate Name</th>
//                 <th>Camp Name</th>
//                 <th>Camp Fees</th>
//                 <th>Payment Status</th>
//                 <th>Confirm Status</th>
//                 <th>Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {participant.length > 0 ? (
//                 participant.map((item, idx) => (
//                   <tr key={item._id}>
//                     <th>{idx + 1}</th>
//                     <th>{item.participantName}</th>
//                     <td>
//                       <div className="flex items-center gap-3">
//                         {item.campName}
//                       </div>
//                     </td>
//                     <td>
//                       <h1>{item.price} $</h1>
//                     </td>
//                     <td></td>
//                     <td className="text-center">
//                       <button className="btn bg-sky-500 btn-outline">{item.status}</button>
//                     </td>
//                     <td>{item.confirm}</td>
//                     <th>
//                       <button className="btn btn-xs">
//                         <FaEdit className="text-red-700" />
//                       </button>
//                     </th>
//                     <th>
//                       <FaTrash className="text-red-700" />
//                     </th>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     No participant data found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageRegCamp;


import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const ManageRegCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page

  const { data: participant = [] } = useQuery({
    queryKey: ["participant"],
    queryFn: async () => {
      const res = await axiosSecure.get('/participant');
      return res.data;
    },
  });

  // Calculate total number of pages
  const totalPages = Math.ceil(participant.length / perPage);

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
        <h2 className="text-center my-10 font-bold text-2xl mx-auto ">
          Participant Pay Camps {participant.length}
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {participant.length > 0 ? (
                participant.slice(startIndex, endIndex).map((item, idx) => (
                  <tr key={item._id}>
                    <td>{startIndex + idx + 1}</td>
                    <td>{item.participantName}</td>
                    <td>{item.campName}</td>
                    <td>{item.price} $</td>
                    <td>
                      <button className="btn bg-sky-500 btn-outline">
                        {item.status}
                      </button>
                    </td>
                    <td>{item.confirm}</td>
                    <td>
                      <button className="btn btn-xs">
                        <FaEdit className="text-red-700" />
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
    </div>
  );
};

export default ManageRegCamp;