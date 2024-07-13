 // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   if (!stripe || !elements) {
  //     // handle error
  //     return;
  //   }
  //   const card = elements.getElement(CardElement);

  //   if (card == null) {
  //     return;
  //   }

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card,
  //   });
  //   if (error) {
  //     console.log("Payment error", error);
  //     setError(error.message);
  //   } else {
  //     console.log("Payment method", paymentMethod);
  //     setError("");
  //   }

  //   // confirm payment
  //   const { paymentIntent, error: confirmError } =
  //     await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: card,
  //         billing_details: {
  //           email: user?.email || "anonymous",
  //           name: user?.displayName || "anonymous",
  //         },
  //       },
  //     });
  //   if (confirmError) {
  //     console.log("confirm error showing");
  //   } else {
  //     console.log("payment intent", paymentIntent);
  //     if (paymentIntent.status === "succeeded") {
  //       console.log("transaction id", paymentIntent.id);
  //       setTransactionId(paymentIntent.id);

  //       // now save the payment history
  //       const payments = {
  //         email: user.email,
  //         name: user.displayName,
  //         price: price,
  //         campName: campName,
  //         transactionId: paymentIntent.id,
  //         date: new Date(),
  //         status: "Paid",
  //         confirm: confirm,
  //         itemIds: camp_id,
  //       };

  //       const res = await axiosSecure.post("/payments", payments);
  //       console.log("Payment saved", res);
  //       toast.success("Payment saved");
        
  //       navigate("/dashboard/paymentHistory");
  //       setLoading(false);
  //     }
  //   }
  // };
