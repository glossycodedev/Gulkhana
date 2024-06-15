import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { submit_address, get_address } from '../store/reducers/homeReducer';
import { place_order } from '../store/reducers/orderReducer';
import { backend_url_img } from '../api/server';
import toast from 'react-hot-toast';

const Shipping = () => {
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.home);

  const [res, setRes] = useState(false);
  const [existPlace, setExistPlace] = useState(false);
  const [place, setPlace] = useState('');
  const [addressId, setAddressId] = useState('');
  const [existAddress, setExistAddress] = useState('');
  const [touched, setTouched] = useState(false);
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState({
    place: '',
    address: '',
    phone: '',
    street: '',
    city: '',
  });

  useEffect(() => {
    if (existPlace || userInfo) {
      dispatch(get_address(userInfo.id));
      // setExistPlace(false);
    }
  }, [existPlace, userInfo]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  console.log(state.place);
  // const save = (e) => {
  //   e.preventDefault();
  //   const { place, address, phone, street, city } = state;
  //   if (place && address && phone && street && city) {
  //     setRes(true);
  //   }
  // };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  const addAddress = () => {
    const obj = {
      userId: userInfo.id,
      place: state.place,
      address: state.address,
      phone: state.phone,
      street: state.street,
      city: state.city,
    };

    dispatch(submit_address(obj));
    setExistPlace(true);
    setUpdate(false);
    setRes(true);
    console.log(existPlace);
  };

  return (
    <div>
      <Header />
      <section className=" mt-8 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white"></div>
          </div>
        </div>
      </section>

      <section>
        <div className=" bg-[#F8F9F9] py-5 mb-5">
          <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full">
              <Link to="/">Home</Link>
              <span>
                <IoIosArrowForward />
              </span>

              <span className="text-[#B65278]">Shipping </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ffffff]">
        <div className="w-[70%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-6">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm border rounded-sm">
                  <div className="flex items-center bg-white pb-5">
                    <h2 className="text-slate-600 font-bold  ">
                      Shipping Address{' '}
                    </h2>
                    <button
                      onClick={() => {
                        setRes(false);
                        setExistAddress('');
                        setExistPlace(false);
                        setUpdate(false);
                        // setPlace('');
                        setState({
                          place: '',
                          address: '',
                          phone: '',
                          street: '',
                          city: '',
                        });
                      }}
                      className="px-3 py-[6px] ml-4 rounded-sm hover:bg-[#14321e] hover:shadow-lg bg-[#00A535] text-white"
                    >
                      Add New Address{' '}
                    </button>
                  </div>
                  <div className="flex  py-1 rounded">
                    {addresses &&
                      addresses?.map((a, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setExistAddress(a.place);
                            setState({
                              place: a.place,
                              address: a.address,
                              phone: a.phone,
                              street: a.street,
                              city: a.city,
                            });
                            setRes(true);
                            setExistPlace(true);
                            setAddressId(a._id);
                          }}
                          className="cursor-pointer ml-4 bg-blue-200 text-blue-800 text-sm px-4 py-2 font-medium rounded"
                        >
                          {a.place}
                        </div>
                      ))}
                  </div>

                  {!existPlace && (
                    <>
                      <form onSubmit={addAddress}>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex justify-between items-center py-3">
                            <h2 className="text-lg  text-slate-600 p-2">
                              Place{' '}
                            </h2>
                            <select
                            name="place"
                              className="outline-none px-3 py-1 border rounded-md text-slate-600"
                              required
                              value={state.place}
                              onChange={inputHandle}
                              // onChange={(e) => setPlace(e.target.value)}
                              // onBlur={() => setTouched(true)}
                            >
                              <option value="all">--Address Place--</option>
                              <option value="home">Home</option>
                              <option value="work">Work</option>
                            </select>
                            {/* {touched && place === '' && (
                              <span className="text-red-500">
                                Please select a place
                              </span>
                            )} */}
                          </div>
                        </div>
                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          {/* <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name"> Name </label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="name"
                              id="name"
                              placeholder="Name"
                            />
                          </div> */}

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address"> Address </label>
                            <input
                              required
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="address"
                              id="address"
                              placeholder="Address"
                            />
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone"> Phone </label>
                            <input
                              required
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province"> Street </label>
                            <input
                              required
                              onChange={inputHandle}
                              value={state.street}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="street"
                              id="street"
                              placeholder="Street"
                            />
                          </div>

                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city"> City </label>
                            <input
                              required
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="city"
                              id="city"
                              placeholder="City"
                            />
                          </div>
                        </div>

                        <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button
                              // disabled={!touched || place === ''}
                              className="px-3 py-[6px] rounded-sm hover:bg-[#14321e] hover:shadow-lg bg-[#00A535] text-white"
                            >
                              {update ? 'Update Address' : 'Save Address'}
                            </button>
                          </div>
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            {/* <label htmlFor="area"> Area </label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="area"
                              id="area"
                              placeholder="Area"
                            /> */}
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {existPlace && (
                    <div className="flex flex-col gap-1 mt-3">
                      {addresses?.map(
                        (a, i) =>
                          a.place === existAddress && (
                            <div key={i}>
                              <h2 className="text-slate-600 font-semibold pb-2">
                                Deliver To {existAddress}
                              </h2>

                              <span>
                                {a.address} {a.phone} {a.street} {a.city}{' '}
                              </span>

                              <span
                                onClick={() => {
                                  setRes(false);
                                  setState({
                                    place: a.place,
                                    address: a.address,
                                    phone: a.phone,
                                    street: a.street,
                                    city: a.city,
                                  });
                                  // setPlace(a.place);
                                  setExistAddress('');
                                  setExistPlace(false);
                                  setAddressId(a._id);
                                  setUpdate(true);
                                }}
                                className="text-indigo-500 cursor-pointer"
                              >
                                Change{' '}
                              </span>
                            </div>
                          )
                      )}
                      {/* 
                      <p className="text-slate-600 text-sm">
                        Email To ariyan@gmail.com
                      </p> */}
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div
                    key={i}
                    className="flex border bg-white p-4 flex-col gap-2"
                  >
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-slate-600 font-bold">
                        {p.shopName}
                      </h2>
                    </div>

                    {p.products.map((pt, i) => (
                      <div key={i} className="w-full border-b flex flex-wrap">
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px]"
                              src={`${backend_url_img}/uploads/${pt.productInfo.images[0]}`}
                              // src={pt.productInfo.images[0]}
                              alt=""
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md font-semibold">
                                {pt.productInfo.name}{' '}
                              </h2>
                              <span className="text-sm">
                                Category: {pt.productInfo.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between mt-3 w-5/12 sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            {/* <h2 className="text-lg text-orange-500"> */}
                            {pt.productInfo.discount !== 0 ? (
                              <>
                                <h2 className="">
                                  $
                                  {pt.productInfo.price -
                                    Math.floor(
                                      (pt.productInfo.price *
                                        pt.productInfo.discount) /
                                        100
                                    )}{' '}
                                </h2>
                                <h2 className="line-through  text-[#B65278]">
                                  ${pt.productInfo.price}
                                </h2>
                              </>
                            ) : (
                              <h2> ${pt.productInfo.price} </h2>
                            )}
                            {/* $
                              {pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100
                                )} */}
                            {/* </h2> */}
                            {/* <p className="line-through">
                              ${pt.productInfo.price}
                            </p>
                            <p>-{pt.productInfo.discount}%</p> */}
                          </div>
                          <div className="flex gap-2 flex-col">
                            <div className="px-3">Quantity: {pt.quantity}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-[#F8F9F9] border  p-3 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>Items Total (items) </span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee </span>
                    <span>${shipping_fee} </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total Payment </span>
                    <span>${price + shipping_fee} </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-lg text-[#059473]">
                      ${price + shipping_fee}{' '}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded-sm ${
                      res
                        ? 'bg-[#B65278] hover:bg-[#D871A1] hover:text-black'
                        : 'bg-[#e195b9] '
                    }  text-sm text-white uppercase`}
                  >
                    Place Order
                  </button>
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

export default Shipping;
