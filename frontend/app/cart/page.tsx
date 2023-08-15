"use client";

import React, { useState } from "react";
import Image from "next/image";
import Wrapper from "../components/Wrapper";
import Link from "next/link";
import CartItem from "../components/CartItem";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCartStore } from "../store/CartStore";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);
interface HandleOrderData {
  paymentMethodId: string;
}

const PaymentForm = ({
  handleOrder,
}: {
  handleOrder: (data: HandleOrderData) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Handle Stripe or Elements not being ready
      return;
    }

    setLoading(true);

    try {
      // Create a PaymentMethod
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        // Handle the absence of cardElement, e.g., if the CardElement is not loaded properly
        setLoading(false);
        return;
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error creating PaymentMethod:", error);
        setLoading(false);
        return;
      }

      // Call the handleOrder function to complete the payment
      handleOrder({ paymentMethodId: paymentMethod.id });
      setLoading(false);
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      toast.error("Payment Failed");
    }
  };

  return (
    <div>
      <CardElement />
      <button
        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        onClick={handlePayment}
        disabled={loading}
      >
        Checkout
      </button>
    </div>
  );
};



const Cart = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOrder = async ({ paymentMethodId }: HandleOrderData) => {
    try {
      setLoading(true);

      // Simulate order processing delay (replace with actual logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handling the rest of the order processing and payment
      // ...

      setLoading(false);
      toast.success("Payment successful");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="py-20 w-full">
      <Wrapper className="primary">
        <div className="text-center max-w-[800px] mx-auto md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS */}
          <div className="flex-[2]">
            <div className="text-lg font-bold">Cart Items</div>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>

          {/* CART SUMMARY */}
          <div className="flex-[1]">
            <div className="text-lg font-bold">Summary</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>
                <div className="text-md md:text-lg font-medium text-black">
                  $6000
                </div>
              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                unde fugiat dolorum, veritatis reiciendis obcaecati cupiditate
                consectetur nihil nisi deserunt sit voluptas eligendi, velit
                consequuntur asperiores beatae libero! Velit, sed.
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm handleOrder={handleOrder} />
            </Elements>
          </div>
        </div>

        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image
            src="/empty.jpg"
            alt=""
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">
            Looks like you haven&apos t added anything to your cart. <br />
            Go ahead and explore!
          </span>
          <Link
            href="/"
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
          >
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default Cart;
