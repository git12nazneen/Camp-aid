import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const {data : users = []} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    return (
        <div>
            <h2>user {users.length}</h2>
        </div>
    );
};

export default AllUsers;