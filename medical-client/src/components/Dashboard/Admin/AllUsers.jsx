import { useQuery } from '@tanstack/react-query';
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useState } from 'react';

const AllUsers = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const [perPage] = useState(10); // Number of items per page
      const axiosSecure = useAxiosSecure()


    const {data : users = [] , refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)   
        .then(res => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ` ${user.name} Your are admin now `,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };

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
            axiosSecure.delete(`/users/${userId}`).then((res) => {
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
    

 // Calculate total number of pages
 const totalPages = Math.ceil(users.length / perPage);

 // Function to handle page change
 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 // Calculate the index range for current page
 const startIndex = (currentPage - 1) * perPage;
 const endIndex = startIndex + perPage;


    return (
        <div>
          <div className="flex justify-evenly my-4">
            <h2 className="text-3xl font-bold text-sky-500">All users</h2>
          </div>
    
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
    
                  {/* <th>Image</th> */}
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.slice(startIndex, endIndex).map((user, idx) => (
                  <tr key={user._id}>
                      <td>{startIndex + idx + 1}</td>
    
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12"></div>
                        </div>
                        <div></div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{user.name}</div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={()=>handleAdmin(user)}
                          className="btn-outline font-extrabold"
                        >
                          <MdAdminPanelSettings className="text-3xl" />
                        </button>
                      )}
                    </td>
                    <th>
                    <button
                        onClick={() => handleDelete(user._id)}
                        className="btn bg-sky-500 btn-xs"
                        >
                        Delete
                        </button>
                    </th>
                  </tr>
                ))}
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
      );
  
};

export default AllUsers;