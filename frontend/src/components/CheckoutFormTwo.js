import React, { useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  //   useStripe,
  //   useElements,
} from "@stripe/react-stripe-js";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutFormTwo = ({ orderId, clientSecretTwo }) => {
  localStorage.setItem("orderId", orderId);
  //   const stripe = useStripe();
  //   const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    loyout: "tabs",
  };

  //   const submit = async (e) => {
  //     e.preventDefault();
  //     //     if (!stripe || !elements) {
  //     //       return;
  //     //     }
  //     setIsLoading(true);
  //     const { error } = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: "http://localhost:3000/order/confirm",
  //       },
  //     });
  //     if (error.type === "card_error" || error.type === "validation_error") {
  //       setMessage(error.message);
  //     } else {
  //       setMessage("An Unexpected error occured");
  //     }
  //     setIsLoading(false);
  //   };

  const create_payment_Two = async () => {
    console.log("CheckoutFormTwo-1");
    try {
      console.log("CheckoutFormTwo-2");
      //       <Navigate to="http://localhost:3000/order/confirm" replace={true} />;
      navigate("/order/confirm", { state: { data: clientSecretTwo } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <button
        onClick={create_payment_Two}
        className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
      >
        Start Payment2
      </button>
    </div>
    //     <form onSubmit={submit} id="payment-form">
    //       {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
    //       {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}

    //       <button
    //         disabled={isLoading || !stripe || !elements}
    //         id="submit"
    //         className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
    //       >
    //         <span id="button-text">
    //           {isLoading ? <div>Loading...</div> : "Pay Now kaka1"}
    //         </span>
    //       </button>
    //       {message && <div>{message}</div>}
    //     </form>
  );
};

export default CheckoutFormTwo;
