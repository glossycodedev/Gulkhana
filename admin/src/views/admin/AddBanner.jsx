import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaRegImage, FaTrash } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import {
  add_banner,
  delete_banner,
  //   get_banner,
  get_banners,
  messageClear,
  update_banner,
} from '../../store/Reducers/bannerReducer';
import { backend_url_img } from '../../api/server';
import toast from 'react-hot-toast';

const AddBanner = () => {
  //   const { productId } = useParams();
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage, banners, banner } = useSelector(
    (state) => state.banner
  );

  // const [bannerName, setBannerName] = useState('');
  const [imageShow, setImageShow] = useState('');
  const [image, setImage] = useState('');
  const [bannerId, setBannerId] = useState('');

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

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  const add = (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image file.');
    } else {
      // e.preventDefault();
      if (bannerId) {
        dispatch(
          update_banner({
            // bannerName: bannerName,
            image: image,
            bannerId: bannerId,
          })
        );
        setBannerId('');
        dispatch(get_banners());
      } else {
        dispatch(add_banner({ image: image }));
        dispatch(get_banners());
      }

      setImageShow('');
      setImage('');
    }
  };

  // const deleteBanner = useCallback(() => {
  //   dispatch(delete_banner({ bannerId: bannerId }));
  //   dispatch(get_banners());
  // }, [bannerId, dispatch]);

  const deleteBanner = (id) => {
    // e.preventDefault();
    dispatch(delete_banner({ bannerId: id }));
    dispatch(get_banners());
  };

  // const update = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('mainban', image);
  //   dispatch(update_banner({ info: formData, bannerId: banner._id }));
  // };

  useEffect(() => {
    dispatch(get_banners());
  }, [banner]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Banners</h2>
      </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        {/* {!banner && ( */}
        <div>
          <form onSubmit={add}>
            {/* <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="bannerName"> Banner Name</label>
              <input
                value={bannerName}
                onChange={(e) => {
                  setBannerName(e.target.value);
                }}
                required
                className="px-4 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                type="text"
                id="bannerName"
                bannerName="banner_name"
                placeholder="Banner Name"
              />
            </div> */}
            <div className="mb-4">
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#5c5a5a]"
                htmlFor="image"
              >
                {imageShow ? (
                  <img className="w-full h-full" src={imageShow} alt="" />
                ) : (
                  <>
                    <span>
                      <FaRegImage />{' '}
                    </span>
                    <span>Select Image</span>
                  </>
                )}
                {/* <span className="text-4xl">
                  <FaRegImage />
                </span>
                <span>Select Banner Image </span> */}
              </label>
              <input
                required
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>

            {/* {imageShow && (
              <div className="mb-4">
                <img className="w-full h-[300px]" src={imageShow} alt="" />
              </div>
            )} */}

            <button
              disabled={loader ? true : false}
              className="bg-[#2A629A] w-[280px] hover:bg-[#313A46] hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                'Add Banner'
              )}
            </button>
          </form>
        </div>
        {/* )} */}

        {/* {banner && (
          <div>
            {
              <div className="mb-4">
                <img className="w-full h-[300px]" src={banner.link} alt="" />
              </div>
            }

            <form onSubmit={update}>
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="bannerName"> Banner Name</label>
                <input
                  value={bannerName || ''}
                  onChange={(e) => {
                    setBannerName(e.target.value);
                  }}
                  required
                  className="px-4 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  id="bannerName"
                  name="banner_name"
                  placeholder="Banner Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-white"
                  htmlFor="image"
                >
                  <span className="text-4xl">
                    <FaRegImage />
                  </span>
                  <span>Select Banner Image </span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>

              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-[300px]" src={imageShow} alt="" />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  'Update Banner'
                )}
              </button>
            </form>
          </div>
        )} */}
      </div>
      <div className="flex flex-wrap w-full mt-4 ">
        <div className="w-full ">
          <div className="w-full p-4 bg-[#ffffff] rounded-md shadow-md">
            {/* <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            /> */}

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left  text-[#d0d2d6]">
                <thead className="text-sm text-[#595b5d] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    {/* <th scope="col" className="py-3 px-4">
                      Name
                    </th> */}
                    <th scope="col" className=" text-right  py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {banners?.map((d, i) => (
                    <tr
                      key={i}
                      className=" border-b text-lg text-[#595b5d] border-[#dcdada]"
                    >
                      <td scope="row" className="py-1 px-4  whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td scope="row" className="py-1 px-4 whitespace-nowrap">
                        <img
                          className="w-[445px] h-[45px]"
                          src={`${backend_url_img}/uploads/${d.image}`}
                          alt=""
                        />
                      </td>
                      {/* <td scope="row" className="py-1 px-4 whitespace-nowrap">
                        {d.bannerName}
                      </td> */}

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-end items-center text-[#d0d2d6] gap-2">
                          <div
                            onClick={(e) => {
                              setImage(`${backend_url_img}/uploads/${d.image}`);
                              setBannerId(d._id);
                              // setBannerName(d.bannerName);
                              setImageShow(
                                `${backend_url_img}/uploads/${d.image}`
                              );
                            }}
                             className="p-[6px] bg-[#2A629A] cursor-pointer rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                          >
                            {' '}
                            <FaEdit />{' '}
                          </div>
                          <div
                            onClick={() => {
                              deleteBanner(d._id);
                            }}
                            className="cursor-pointer text-[#2A629A]"
                          >
                            <div className=" p-[6px] text-[#C40C0C]">
                              {' '}
                              <FaTrash />{' '}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              {/* <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
