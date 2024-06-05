import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { useLoaderData } from "react-router-dom";



// TODO :
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getway_Pk);

const Payment = () => {
  
 const paymentItem = useLoaderData()
 console.log(paymentItem)

  return (
    <div className="mx-auto text-center mt-14">
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
         Payment
        <br /> Please at first <span className="text-blue-500">done your payment</span>{" "}

       <div className="px-12 pt-10">
       <Elements stripe={stripePromise}>
         <CheckOutFrom paymentItem={paymentItem}></CheckOutFrom>
        </Elements>
       </div>

      </h1>
    </div>
  );
};

export default Payment;
