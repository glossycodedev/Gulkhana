import React, { useEffect, useState } from 'react';
import { FaImages } from 'react-icons/fa6';
import { FadeLoader } from 'react-spinners';
import { FaRegEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_user_info,
  messageClear,
  profile_info_add,
} from '../../store/Reducers/authReducer';
import { profile_image_upload } from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
import { backend_url_img } from '../../api/server';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const [state, setState] = useState({
    address: '',
    phone: '',
    shopName: '',
    city: '',
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );
  const [imageShow, setImage] = useState('');
  const [sellerImage, setSellerImage] = useState('');

  useEffect(() => {
    dispatch(get_user_info());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo?.image) {
      setImage(`${backend_url_img}/uploads/${userInfo.image}`);
    }
  }, [userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_user_info());
    }
  }, [successMessage, dispatch, location]);

  const add_image = (e) => {
    if(!sellerImage){
      toast.success('Please upload image');
    }
    else{
      dispatch(
        profile_image_upload({ image: sellerImage, sellerId: userInfo._id })
      );
      toast.success('Image updated successfully');
    }
   
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setSellerImage(files[0]);
    }
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Profile</h2>
      </div>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-full">
          <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md text-[#d0d2d6]">
            <div className="flex justify-center rounded-full items-center py-3">
              {imageShow ? (
                <label
                  htmlFor="img"
                  className="h-[200px] w-[300px] relative p-3  overflow-hidden"
                >
                  <img className="w-full h-full" src={imageShow} alt="" />
                  {/* <img src={userInfo.image} alt="" className="flex justify-center rounded-full items-center"/> */}
                  {loader && (
                    <div className="bg-[#313A46] absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
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
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-[#313A46]absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={imageHandle}
                type="file"
                className="hidden rounded-full"
                id="img"
              />
            </div>
            <div className="flex justify-center items-center flex-col px-7 ">
              <button
                onClick={add_image}
                disabled={loader ? true : false}
                // className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
                className=" bg-[#36ae5c] w-[200px] hover:bg-[#384631]  hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  'Update Image'
                )}
              </button>
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-md flex-col gap-2 p-4 bg-[#313A46] rounded-md relative">
                {/* <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaRegEdit />{' '}
                </span> */}
                <div className="flex gap-2">
                  <span>Name : </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email : </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role : </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status : </span>
                  <span>{userInfo.status}</span>
                </div>
                {/* <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo.payment === 'active' ? (
                      <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          dispatch(create_stripe_connect_account())
                        }
                        className="bg-[#2A629A] text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
                      >
                        Click Active
                      </span>
                    )}
                  </p>
                </div> */}
              </div>
            </div>

            <div className="px-0 md:px-5 py-2 ">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add}>
                  <div className="flex flex-col w-full gap-1 mb-2 ">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#313A46] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Shop Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="address">address</label>
                    <input
                      value={state.address}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Address"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="phone">Phone</label>
                    <input
                      value={state.phone}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="city">City</label>
                    <input
                      value={state.city}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                    />
                  </div>

                  <button
                    disabled={loader ? true : false}
                    className="bg-red-500 w-[200px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-md flex-col gap-2 p-4 bg-[#313A46] rounded-md relative">
                  {/* <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaRegEdit />{' '}
                  </span> */}
                  <div className="flex gap-2">
                    <span>Shop Name : </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Address : </span>
                    <span>{userInfo.shopInfo?.address}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Phone : </span>
                    <span>{userInfo.shopInfo?.phone}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>City : </span>
                    <span>{userInfo?.city}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="old_password"
                    id="o_password"
                    placeholder="Old Password"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    name="new_password"
                    id="n_password"
                    placeholder="New Password"
                  />
                </div>

                <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
