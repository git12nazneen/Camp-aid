import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://server-two-sage-80.vercel.app'
})


const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;