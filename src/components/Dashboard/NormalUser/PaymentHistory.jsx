import React from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey:['payments', user.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div className='max-w-5xl mx-auto'>
        <h2 className='text-center my-10 font-bold text-2xl mx-auto '>Participant Pay Camps {payments.length}</h2>
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
                <th>Cancel</th>
               
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((item, idx) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.name}</th>
                    <td>
                      <div className="flex items-center gap-3">
                       
                          {new Date(item.date).toLocaleString()}
                           
                        
                      </div>
                    </td>
                    <td><h1>{item.price}</h1></td>
                    <td><h1>{item.status}</h1></td>
                    <td>
                      {item.confirm}
                    </td>
                    
                    <th>
                      <FaTrash className="text-red-700" />
                    </th>
                  
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No participant data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;