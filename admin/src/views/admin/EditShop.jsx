import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';
// import {
//   profile_image_upload,
//   seller_register,
// } from '../../store/Reducers/authReducer';
import { FaImage } from 'react-icons/fa';
import { backend_url_img } from '../../api/server';
import {
  seller_update,
  get_seller,
  profile_image_upload,
} from '../../store/Reducers/sellerReducer';
import { get_category } from '../../store/Reducers/categoryReducer';

const EditShop = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { categorys } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage, seller } = useSelector(
    (state) => state.seller
  );

  const [imageShow, setImage] = useState('');
  const [sellerImage, setSellerImage] = useState('');
  const [state, setState] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
    shopName: '',
    city: '',
  });

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: '',
        parPage: '',
        page: '',
      })
    );
  }, []);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  useEffect(() => {
    setState({
      name: seller?.name,
      phone: seller?.phone,
      password: seller?.password,

      address: seller.shopInfo?.address,
      shopName: seller.shopInfo?.shopName,
      city: seller.shopInfo?.city,
      //   image: `${backend_url_img}/uploads/${seller?.image}`,
    });
    setCategory(seller.category);
    setImage(`${backend_url_img}/uploads/${seller?.image}`);
  }, [seller]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setSellerImage(files[0]);
    }
  };

  const add_image = (e) => {
    dispatch(profile_image_upload({ image: sellerImage, sellerId: sellerId }));
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
      });
      setImage('');
      setSellerImage('');
      setCategory('');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const submit = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      phone: state.phone,
      password: state.password,
      category: category,
      address: state.address,
      shopName: state.shopName,
      city: state.city,
      sellerId: sellerId,
    };

    dispatch(seller_update(obj));
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
                <label htmlFor="brand">Phone</label>
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
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--select category--"
                />

                <div
                  className={`absolute top-[101%] bg-[#dee1e4] w-full transition-all ${
                    cateShow ? 'scale-100' : 'scale-0'
                  } `}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full  focus:border-[#2A629A] outline-none bg-transparent border border-slate-700 rounded-md text-[#5c5a5a]  overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-auto overflow-x-scrool">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 hover:bg-[#2A629A] hover:text-white hover:shadow-lg w-full cursor-pointer ${
                          category === c.name && 'bg-[#2A629A] text-white'
                        }`}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue('');
                          setAllCategory(categorys);
                        }}
                      >
                        {c.name}{' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="Shop">Shop Name</label>
                <input
                  value={state.shopName}
                  onChange={inputHandle}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="shopName"
                  id="Shop"
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
                    <span>Select Image</span>
                  </>
                )}
              </label>

              <input
                onChange={imageHandle}
                className="hidden"
                type="file"
                name="image"
                id="image"
              />
              <div className="px-7 ">
                <button
                  onClick={add_image}
                  disabled={loader ? true : false}
                  // className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
                  className=" bg-[#36ae5c] w-[200px] hover:bg-[#384631]  hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                  ) : (
                    'Edit Image'
                  )}
                </button>
              </div>
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
                  'Edit Shop'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShop;
