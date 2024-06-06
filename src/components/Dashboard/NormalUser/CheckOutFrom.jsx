
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const CheckOutFrom = ({paymentItem}) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure();
  const {price} = paymentItem;
  console.log('price', price)
  

  useEffect(()=>{
    axiosSecure.post('/create-payment-intent', {price: parseInt(price)})
    .then(res=>{
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
  },[axiosSecure,price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // handle error
      return;
    }
    const card = elements.getElement(CardElement);

       if(card == null){
            return;
      }

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
      })
      if(error){
        console.log('Payment error', error)
        setError(error.message)
      }
      else{
        console.log('Payment method', paymentMethod)
        setError('')
      }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

        <button type="submit" disabled={!stripe || !clientSecret}>
            <button className='btn btn-primary mt-32'>Pay</button>
       </button>
        <p className='text-red-600'>{error}</p>
    </form>
  );
};

export default CheckOutFrom;
