import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  admin_order_status_update,
  get_admin_order,
  messageClear,
} from '../../store/Reducers/OrderReducer';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId]);
  console.log(order);
  const status_update = (e) => {
    dispatch(
      admin_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
    dispatch(get_admin_order(orderId));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pb-5 ">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Order Details</h2>
      </div>
      <div className="w-full p-3 bg-[#ffffff] shadow-md rounded-md ">
        <div className="flex justify-between items-center p-3 ">
          <h2 className="text-xl text-[#5c5a5a] ">Order ID</h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-[#829ebab9] outline-none bg-[#2A629A] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="w-full p-4">
          <div className="w-full  grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
            <div className="w-full">
              <div className="flex gap-2 text-lg text-[#5c5a5a]">
                <h2>#{order._id}</h2>
                <span>{order.date}</span>
              </div>
              <div className=" text-[#5c5a5a]text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order.shippingInfo?.name}{' '}
                  </h2>
                  <p>
                    <span className="text-sm">
                      {order.shippingInfo?.address}
                      {order.shippingInfo?.province}
                      {order.shippingInfo?.city}
                      {order.shippingInfo?.area}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status: </h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>
                <span>Price : ${order.price}</span>

                <div className="mt-4 flex flex-col  gap-4 bg-[#ECEDED] rounded-md">
                  <div className="text-[#5c5a5a]  p-1">
                    {order.products &&
                      order.products.map((p, i) => (
                        <>
                          <div>
                            <span>Shop Name : </span>
                            <span className="text-md font-medium">
                              {p.shopName}
                            </span>
                          </div>
                          <div
                            key={i}
                            className="flex gap-3 text-md justify-start items-center"
                          >
                            <img
                              className="w-[50px] h-[50px] "
                              src={p.images[0]}
                              alt=""
                            />

                            <div className="w-full flex gap-3  text-md justify-between">
                              <div>
                                <h2>{p.name} </h2>
                                <p>
                                  <span>Brand : </span>
                                  <span>{p.brand}</span>
                                  <div>
                                    <span className="text-lg">
                                      Quantity : {p.quantity}{' '}
                                    </span>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="">
                <div className="mt-4 flex flex-col bg-[#F9F9F9] border rounded-md p-4">
                  {order?.suborder?.map((o, i) => (
                    <div key={i + 20} className="text-[#5c5a5a]mt-2">
                      <div className="flex justify-start items-center gap-3">
                        <h2>Seller {i + 1} Order : </h2>
                        <span>{o.delivery_status}</span>
                      </div>

                      {o.products?.map((p, i) => (
                        <>
                          <div>
                            <span>Shop Name : </span>
                            <span className="text-md font-medium">
                              {p.shopName}
                            </span>
                          </div>
                          <div
                            key={i}
                            className="flex gap-3 justify-start items-center text-md mt-2"
                          >
                            <img
                              className="w-[50px] h-[50px]"
                              src={p.images[0]}
                              alt=""
                            />

                            <div>
                              <h2>{p.name} </h2>
                              <p>
                                <span>Brand : </span>
                                <span>{p.brand}</span>
                                <div>
                                  <span className="text-lg">
                                    Quantity : {p.quantity}{' '}
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
