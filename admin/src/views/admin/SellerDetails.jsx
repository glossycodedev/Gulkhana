import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  get_seller,
  seller_status_update,
  messageClear,
} from '../../store/Reducers/sellerReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
// import { FaImages } from 'react-icons/fa';
import { profile_image_upload } from '../../store/Reducers/sellerReducer';
// import { profile_image_upload } from '../../store/Reducers/authReducer';
import { backend_url_img } from '../../api/server';

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { loader,seller, successMessage } = useSelector((state) => state.seller);
  
 
  const { sellerId } = useParams();

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  const [status, setStatus] = useState('');
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };

  const add_image = (e) => {
    if (e.target.files.length > 0) { 
        const formData = new FormData()
        formData.append('image',e.target.files[0])
        dispatch(profile_image_upload(formData))
    }

}

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Shop Details</h2>
      </div>
      <div className="w-full p-4 bg-[#fff] shadow-md rounded-md">
        <div className="w-full  grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 text-[#d0d2d6]">
          <div className="w-full flex justify-center items-center ">
          {/* {
                    seller?.image ?  */}
                    <label htmlFor="img" className='w-[300px]  relative cursor-pointer overflow-hidden rounded-full bg-[#4b1212] '>
                        <img src={`${backend_url_img}/uploads/${seller?.image}`} alt="" />
                        {
                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                            <span>
                                <FadeLoader/>
                            </span>

                        </div>
                    }


                    </label> 
                    
                    {/* : <label className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative' htmlFor="img">
                    <span><FaImages /> </span>
                    <span>Select Image</span>
                    {
                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                            <span>
                                <FadeLoader/>
                            </span>

                        </div>
                    }

                </label>
                } */}
                <input onChange={add_image} type="file" className='hidden' id='img' /> 
          </div>

          <div className="w-full">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg text-[#5c5a5a]">
                <h2>Basic Info</h2>
              </div>

              <div className="flex justify-between text-md flex-col gap-2 p-4 bg-[#F9FBFE] rounded-md">
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Seller Name : </span>
                  <span>{seller?.name} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Shop Name : </span>
                  <span>{seller?.shopInfo?.shopName} </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Role : </span>
                  <span>{seller?.role} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Status : </span>
                  <span>{seller?.status} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Payment Status : </span>
                  <span>{seller?.payment} </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg text-[#5c5a5a]">
                <h2>Address</h2>
              </div>

              <div className="flex justify-between text-md flex-col gap-2 p-4 bg-[#F9FBFE] rounded-md">
                {/* <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Shop Name : </span>
                  <span>{seller?.shopInfo?.shopName} </span>
                </div> */}
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Address : </span>
                  <span>{seller?.shopInfo?.address} </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Phone : </span>
                  <span>{seller?.phone} </span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>City: </span>
                  <span>{seller?.shopInfo?.city} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={submit}>
            <div className="flex gap-4 px-6 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#2A629A] border border-slate-700 rounded-md text-[#ffffff]"
                name=""
                id=""
                required
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
              <button className="bg-[#006E23] w-[170px] hover:shadow-slate-700  hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
