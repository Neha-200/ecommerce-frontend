import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/cart-items";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {

  const {cartItems,subtotal,tax,total,shippingCharges,discount} = useSelector(
    (state: { cartReducer:CartReducerInitialState }) => state.cartReducer
  );

  const dispatch = useDispatch();

  const [cuponCode,setCuponCode] = useState<string>("");
  const [isValidCuponCode,setIsValidCuponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem:CartItem) => {
    if(cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
  };

  const decrementHandler = (cartItem:CartItem) => {
    if(cartItem.quantity <= 1) return;
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
  };
  
  const removeHandler = (productId:string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    
    const { token:cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
      .get(`${server}/api/v1/payment/discount?coupon=${cuponCode}`,{cancelToken})
      .then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsValidCuponCode(true);
        dispatch(calculatePrice());
      })
      .catch(() => {
        dispatch(discountApplied(0));
        setIsValidCuponCode(false);
        dispatch(calculatePrice());
      });
      
    },1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCuponCode(false);
    }
  },[cuponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  },[cartItems]);

  return (
    <div className="cart">
      <main>{cartItems.length > 0 ? cartItems.map((i, idx) => 
      <CartItems 
      incrementHandler={incrementHandler}
      decrementHandler={decrementHandler}
      removeHandler={removeHandler}
      key={idx} cartItem={i}/>) : <h1>No Items Added</h1>}</main>

      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>Discount: <em>-₹{discount}</em> </p>
        <p><b>Total: ₹{total}</b></p>
        <input type="text" value={cuponCode} onChange={(e) => setCuponCode(e.target.value)}
        placeholder="Enter Cuponcode"/>
        {cuponCode && (isValidCuponCode? <span className="green">₹{discount} off using the <code>{cuponCode}</code></span>
         : <span className="red">Invalid Cuponcode <VscError/></span>)}
      
      {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link> }
      </aside>
    </div>
    
  )
}

export default Cart