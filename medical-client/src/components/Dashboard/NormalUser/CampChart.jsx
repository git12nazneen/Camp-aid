

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchParticipantData } from './participantService';
import useAuth from '../../../hook/useAuth';

const CampChart = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      if (user && user.email) {
        const result = await fetchParticipantData(user.email);
        const processedData = result.map(item => ({
          campName: item.campName,
          price: parseFloat(item.price)
        }));
        setData(processedData);
      }
    };

    getData();
  }, [user]);

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="campName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" fill="#87CEEB" />
    </BarChart>
  );
};

export default CampChart;
