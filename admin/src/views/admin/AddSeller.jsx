import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';
import { seller_register } from '../../store/Reducers/sellerReducer';
import { FaImage } from 'react-icons/fa';

const AddSeller = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.seller
  );
  const [imageShow, setImage] = useState('');
  const [state, setState] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
    shopName: '',
    city: '',
    image: '',
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandle = (img, files) => {
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: '',
        phone: '',
        password: '',
        address: '',
        shopName: '',
        city: '',
        image: '',
      });
      setImage('');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('phone', state.phone);
    formData.append('password', state.password);
    formData.append('address', state.address);
    formData.append('shopName', state.shopName);
    formData.append('city', state.city);
    formData.append('image', state.image);
    console.log(state);
    dispatch(seller_register(formData));
  };

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Add Shop</h2>
      </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <div className="flex justify-end items-center pb-4">
          {/* <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1> */}
          <Link
            to="/admin/dashboard/shops"
            className="bg-[#2A629A]  hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Shops
          </Link>
        </div>
        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Seller Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col justify-start w-full gap-1 relative">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  value={state.password}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="shopName">Shop Name</label>
                <input
                  value={state.shopName}
                  onChange={inputHandle}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="shopName"
                  id="shopName"
                  placeholder="Shop Name"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="address">address</label>
                <input
                  value={state.address}
                  onChange={inputHandle}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="city">City</label>
                <input
                  value={state.city}
                  onChange={inputHandle}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="city"
                />
              </div>
            </div>

            <div className="flex justify-start items-center py-3">
              {/* {imageShow ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img src={imageShow} alt="" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />{' '}
                  </span>
                  <span>Select Logo</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )} */}
              <label
                className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500  border-[#d0d2d6]"
                htmlFor="image"
              >
                {imageShow ? (
                  <img className="w-full h-full" src={imageShow} alt="" />
                ) : (
                  <>
                    <span>
                      <FaImage />{' '}
                    </span>
                    <span>Select Logo</span>
                  </>
                )}
              </label>
              <input
                onChange={(e) => imageHandle(imageShow, e.target.files)}
                // onChange={imageHandle}
                className="hidden"
                type="file"
                name="image"
                id="image"
              />
            </div>

            <div className="flex">
              <button
                disabled={loader ? true : false}
                // className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
                className="bg-[#2A629A] w-[280px] hover:bg-[#313A46]  hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  'Add Shop'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSeller;
