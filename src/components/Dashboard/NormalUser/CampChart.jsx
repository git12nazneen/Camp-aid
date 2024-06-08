import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchParticipantData } from './participantService';

const CampChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchParticipantData();
      const processedData = result.map(item => ({
        campName: item.campName,
        price: parseFloat(item.price)
      }));
      setData(processedData);
    };

    getData();
  }, []);

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
      <Bar dataKey="price" fill="#8884d8" />
    </BarChart>
  );
};

export default CampChart;
