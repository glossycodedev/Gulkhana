import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';
import { IoIosArrowForward } from 'react-icons/io';

const Payment = () => {
  const {
    state: { price, items, orderId },
  } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  return (
    <div>
      <Header />
      <section className="bg-[#ffffff]">
        <section>
          <div className=" bg-[#F8F9F9] py-5 mt-8 mb-5">
            <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
              <div className="flex justify-start items-center text-md text-slate-600 w-full">
                <Link to="/">Home</Link>
                <span>
                  <IoIosArrowForward />
                </span>

                <span className="text-[#B65278]">Payment </span>
              </div>
            </div>
          </div>
        </section>
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-6 mt-4 ">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-0">
                <div className="flex flex-wrap">
                  {/* <div
                    onClick={() => setPaymentMethod('stripe')}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/stripe.png"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">Stripe</span>
                  </div> */}
                  {/* 
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'cod' ? 'bg-white' : 'bg-slate-100'
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img
                        src="http://localhost:3000/images/payment/cod.jpg"
                        alt=""
                      />
                    </div>
                    <span className="text-slate-600">COD</span>
                  </div> */}
                </div>
                <h2 className=" py-2 font-bold text-lg">Select your payment method </h2>
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className="flex justify-between items-center ps-4 mb-4 border border-gray-300 rounded dark:border-gray-700"
                >
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-4 h-4 text-[#B65278] bg-gray-100 border-gray-300 focus:ring-[#B65278] dark:focus:ring-[#B65278] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-radio-1"
                    className="w-full py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cash on Delivery (COD)
                  </label>
                </div>
                <div className="flex items-center ps-4 border border-gray-300 rounded dark:border-gray-700">
                  <input
                    disabled
                    id="bordered-radio-2"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="bordered-radio-2"
                    className="w-full py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
                  >
                    Cart
                  </label>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="w-full px-4 py-8 mt-8 bg-white border shadow-sm">
                    {/* <button className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white">
                      Pay Now
                    </button> */}
                    <Link to="/dashboard/my-orders">
                      <button className="px-10 py-[6px] rounded-sm hover:bg-[#D871A1] hover:shadow-lg bg-[#B65278] text-white">
                        Complete Order
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-6">
                <div className="bg-[#F8F9F9] shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="font-bold text-lg">Order Summary </h2>
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included </span>
                    <span>${price} </span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount </span>
                    <span className="text-lg text-green-600">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
