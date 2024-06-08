import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import CheckoutFormTwo from "./CheckoutFormTwo";
import { Navigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp"
);

const StripeTwo = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  console.log("clientSecret chya Two?", clientSecret);
  const apperance = {
    theme: "stripe",
  };
  const options = {
    apperance,
    clientSecret,
  };

  const create_payment = async () => {
    console.log("by card");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment",
        { price },
        { withCredentials: true }
      );
      console.log("data", data);
      setClientSecret(data.clientSecret);
      //       <Navigate to="http://localhost:3000/order/confirm" replace={true} />;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="mt-4">
      {clientSecret ? (
        <CheckoutFormTwo orderId={orderId} clientSecretTwo={clientSecret} />
      ) : (
        //         <Elements options={options} stripe={stripePromise}>
        //           <CheckoutFormTwo orderId={orderId} />
        //         </Elements>
        <button
          onClick={create_payment}
          className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
        >
          Start Payment2
        </button>
      )}
    </div>
  );
};

export default StripeTwo;
