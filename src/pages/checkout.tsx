// import {
//   Elements,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { resetCart } from "../redux/reducer/cartReducer";
// import { RootState } from "../redux/store";
// import { NewOrderRequest } from "../types/api-types";
// import { responseToast } from "../utils/features";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const {
//     shippingInfo,
//     cartItems,
//     subtotal,
//     tax,
//     discount,
//     shippingCharges,
//     total,
//   } = useSelector((state: RootState) => state.cartReducer);

//   const [description, setDescription] = useState('');
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

//   const [newOrder] = useNewOrderMutation();

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const orderData: NewOrderRequest = {
//       shippingInfo,
//       orderItems: cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//       user: user?._id!,
//       description
//     };

//     const { paymentIntent, error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin },
//       redirect: "if_required",
//     });

//     if (error) {
//       setIsProcessing(false);
//       return toast.error(error.message || "Something Went Wrong");
//     }

//     if (paymentIntent.status === "succeeded") {
//       const res = await newOrder(orderData);
//       dispatch(resetCart());
//       responseToast(res, navigate, "/orders");
//     }
//     setIsProcessing(false);
//   };
//   return (
//     <div className="checkout-container">
//       <form onSubmit={submitHandler}>
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//         <PaymentElement />
//         <button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const location = useLocation();

//   const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements
//       options={{
//         clientSecret,
//       }}
//       stripe={stripePromise}
//     >
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default Checkout;


// import {
//   Elements,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { resetCart } from "../redux/reducer/cartReducer";
// import { RootState } from "../redux/store";
// import { NewOrderRequest } from "../types/api-types";
// import { responseToast } from "../utils/features";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [description, setDescription] = useState('');


//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const {
//     shippingInfo,
//     cartItems,
//     subtotal,
//     tax,
//     discount,
//     shippingCharges,
//     total,
//   } = useSelector((state: RootState) => state.cartReducer);

//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

//   const [newOrder] = useNewOrderMutation();

//   // const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();

//   //   if (!stripe || !elements) return;
//   //   setIsProcessing(true);

//   //   const orderData: NewOrderRequest = {
//   //     shippingInfo,
//   //     orderItems: cartItems,
//   //     subtotal,
//   //     tax,
//   //     discount,
//   //     shippingCharges,
//   //     total,
//   //     user: user?._id!,
//   //     description,  // Include description if needed in your order data

//   //   };

//   //   // const { paymentIntent, error } = await stripe.confirmPayment({
//   //   //   elements,
//   //   //   confirmParams: { return_url: window.location.origin },
//   //   //   redirect: "if_required",
//   //   // });

//   //   const { paymentIntent, error } = await stripe.confirmPayment({
//   //     elements,
//   //     confirmParams: { 
//   //       return_url: window.location.origin,
//   //       payment_method_data: {
//   //         billing_details: {
//   //           name: user?.name,
//   //           address: shippingInfo,
//   //         },
//   //       },
//   //       description: description,  // Add this line
//   //     },
//   //     redirect: "if_required",
//   //   });
    


//   //   if (error) {
//   //     setIsProcessing(false);
//   //     return toast.error(error.message || "Something Went Wrong");
//   //   }

//   //   if (paymentIntent.status === "succeeded") {
//   //     const res = await newOrder(orderData);
//   //     dispatch(resetCart());
//   //     responseToast(res, navigate, "/orders");
//   //   }
//   //   setIsProcessing(false);
//   // };

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
  
//     if (!stripe || !elements) return;
//     setIsProcessing(true);
  
//     const orderData: NewOrderRequest = {
//       shippingInfo,
//       orderItems: cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//       user: user?._id!,
//       description, // Include description here
//     };
  
//     try {
//       const response = await fetch('http://localhost:4001/api/v1/payment/create', {
//         method: 'POST',
//         body: JSON.stringify({
//           amount: total,
//           description, // Include description here
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const { clientSecret } = await response.json();
  
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: { return_url: window.location.origin },
//         redirect: "if_required",
//       });
  
//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }
  
//       if (paymentIntent.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         responseToast(res, navigate, "/orders");
//       }
//       setIsProcessing(false);
//     } catch (error) {
//       setIsProcessing(false);
//       toast.error("Error creating payment intent");
//     }
//   };
  

//   return (
//     <div className="checkout-container">
//       <form onSubmit={submitHandler}>
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//         <PaymentElement />
//         <button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const location = useLocation();

//   const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements
//       options={{
//         clientSecret,
//       }}
//       stripe={stripePromise}
//     >
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default Checkout;





import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userAddress } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
      description
    };

    // Create a Stripe customer with address details
    const stripeAddress = {
      line1: userAddress.street1,
      line2: userAddress.street2,
      city: userAddress.city,
      country: userAddress.country,
      postal_code: userAddress.zip,
      state: userAddress.state,
    };

    try {
      const res = await fetch('/create-stripe-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          address: stripeAddress,
          description: description
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create Stripe customer');
      }

      const { customerId } = await res.json();

      // Now, proceed with the payment using the customerId and other data...
      // (Implementation depends on your backend logic)

    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      toast.error('Failed to create Stripe customer');
    }

    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
