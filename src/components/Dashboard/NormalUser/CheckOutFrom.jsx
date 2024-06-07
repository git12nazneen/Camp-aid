
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';


const CheckOutFrom = ({paymentItem}) => {
  const {user} = useAuth();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure();
  const {price,camp_id} = paymentItem;
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

      // confirm payment
      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
          card: card,
          billing_details:{
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          }
        }
      })
      if(confirmError){
        console.log('confirm error showing')
      }
      else{
        console.log('payment intent', paymentIntent)
        if(paymentIntent.status === 'succeeded'){
          console.log('transaction id', paymentIntent.id);
          setTransactionId(paymentIntent.id);

          // now save the payment history
          const payments ={
            email : user.email,
            price: price,
            transactionId:paymentIntent.id,
            date: new Date(),
            status:'Paid',
            confirm:'Confirm',
            itemIds: camp_id
            // campId:camps.map(camp=>camp.camp_id)
          }

          const res = await axiosSecure.post('/payments', payments);
          console.log('Payment saved' ,res)

        }
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
       {transactionId && <p className='text-green-600'>Your transaction id : {transactionId}</p>}
    </form>
  );
};

export default CheckOutFrom;
