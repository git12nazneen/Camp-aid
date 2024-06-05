// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutFrom from "./CheckOutFrom";
// import { useLoaderData, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// // TODO :
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_Pk);

// const Payment = () => {
//   const { id } = useParams();
//   const [paymentItem, setPaymentItem] = useState(null)
//   const [error, setError] = useState(null);
//   // const paymentItem = useLoaderData();
//   // console.log('paymentItem', paymentItem);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log(`Fetching camp details for ID: ${id}`);
//       try {
//         const response = await fetch(`http://localhost:5000/camps/${id}`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setPaymentItem(data);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching camp details:', err);
//       }
//     };

//     fetchData();
//   }, [id]);
//  if (error) {
//     return <div>Error: {error}</div>;
//   }
//   const {price } = paymentItem;
//   console.log(price)
//   return (
//     <div className="mx-auto text-center mt-14">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
//         Payment
//         <br /> Please at first{" "}
//         <span className="text-blue-500">done your payment</span>{" "}
//         <div className="px-12 pt-10">
//           <Elements stripe={stripePromise}>
//             <CheckOutFrom paymentItem={paymentItem}></CheckOutFrom>
//           </Elements>
//         </div>
//       </h1>
//     </div>
//   );
// };

// export default Payment;


// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutFrom from "./CheckOutFrom";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// // Load Stripe with the publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_Pk);

// const Payment = () => {
//   const { id } = useParams();
//   const [paymentItem, setPaymentItem] = useState(null);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     console.log(`Fetching camp details for ID: ${id}`);
//   //     try {
//   //       const response = await fetch(`http://localhost:5000/camps/${id}`);
//   //       if (!response.ok) {
//   //         throw new Error(`Error: ${response.status} ${response.statusText}`);
//   //       }

//   //       const text = await response.text();
//   //       console.log('Server response:', text); // Log the raw response for debugging

//   //       const data = text ? JSON.parse(text) : {}; // Safely parse JSON only if there is a response
//   //       console.log(data);
//   //     } catch (err) {
//   //       setError(err.message);
//   //       console.error('Error fetching camp details:', err);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [id]);

//   useEffect(()=>{
//     fetch('http://localhost:5000/camps')
//     .then(res => res.json())
//     .then(data => console.log(data))
//   },[])

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!paymentItem) {
//     return <div>Loading...</div>;
//   }

//   // const { price } = paymentItem;
//   // console.log(price);

//   return (
//     <div className="mx-auto text-center mt-14">
//       <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
//         Payment
//         <br /> Please at first{" "}
//         <span className="text-blue-500">done your payment</span>
//         <div className="px-12 pt-10">
//           <Elements stripe={stripePromise}>
//             <CheckOutFrom paymentItem={paymentItem} />
//           </Elements>
//         </div>
//       </h1>
//     </div>
//   );
// };

// export default Payment;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { useLoaderData } from "react-router-dom";

// Load Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_Pk);

const Payment = () => {
  const paymentItem = useLoaderData();
  console.log('paymentItem', paymentItem);

  if (!paymentItem) {
    return <div>Loading...</div>;
  }

  if (paymentItem.error) {
    return <div>Error: {paymentItem.error}</div>;
  }

  const { price } = paymentItem;

  return (
    <div className="mx-auto text-center mt-14">
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Payment
        <br /> Please at first{" "}
        <span className="text-blue-500">done your payment</span>
        <div className="px-12 pt-10">
          <Elements stripe={stripePromise}>
            <CheckOutFrom paymentItem={paymentItem} />
          </Elements>
        </div>
      </h1>
    </div>
  );
};

export default Payment;
