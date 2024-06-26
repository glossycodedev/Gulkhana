import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_to_card,
  add_to_wishlist,
  messageClear,
} from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { backend_url_img } from '../../api/server';
import { useTranslation } from 'react-i18next';

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate('/login');
    }
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

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishlist({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        price: pro.price,
        image: pro.images[0],
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      })
    );
  };

  return (
    <div className="w-[70%] sm:w-[90%] flex flex-wrap mx-auto mt-5">
      <div className="w-full">
        <div className=" w-full flex justify-between  text-slate-600  relative pb-[30px]">
          <h2 className=" text-xl lg:text-xl md:text-md sm:text-md font-bold">
            {' '}
            {t('home.featur_products')}{' '}
          </h2>
          <div className="w-[80%] sm:w-[30%]  h-[2px] bg-[#FEEAF1] mt-4"></div>
          <h2 className="text-md lg:text-md md:text-md sm:text-sm"><Link to="/shops" >View All </Link> </h2>
        </div>
      </div>

      <div className="w-full  grid grid-cols-5 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {products &&
          products.map((p, i) => (
            <div
              key={i}
              className="border  w-full group transition-all duration-500 hover:shadow-md rounded-md "
            >
              <div className="relative overflow-hidden h-auto ">
                {p.discount ? (
                  <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-[#B65278] font-semibold text-xs left-2 top-2">
                    {p.discount}%{' '}
                  </div>
                ) : (
                  ''
                )}
                <Link to={`/product/details/${p.slug}`}>
                  <img
                    className="sm:w-full w-full h-auto p-2 rounded-md transition-transform duration-700 hover:scale-125"
                    src={`${backend_url_img}/uploads/${p.images[0]}`}
                    //   src={p.images[0]}
                    alt=""
                  />
                </Link>

                <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                  <li
                    onClick={() => add_wishlist(p)}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white  transition-all"
                  >
                    <FaRegHeart />
                  </li>
                  <Link
                    to={`/product/details/${p.slug}`}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white  transition-all"
                  >
                    <FaEye />
                  </Link>
                  <li
                    onClick={() => add_card(p._id)}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white  transition-all"
                  >
                    <RiShoppingCartLine />
                  </li>
                </ul>
              </div>

              <div className="py-2 text-slate-600 px-2">
                <h2 className="font-md">{p.name} </h2>
                <div className="flex justify-between items-center gap-3">
                  <span className="flex text-md">
                  {p.discount !== 0 ? (
                  <>
                  <h2 className="">
                      $
                      {p.price -
                        Math.floor(
                          (p.price * p.discount) / 100
                        )}{' '}
                     
                    </h2>
                     <h2 className="line-through px-3 text-[#B65278]">${p.price}</h2>
                    
                  </>
                ) : (
                  <h2>  ${p.price} </h2>
                )}
                    </span>
                  <div className="flex">
                    <Rating ratings={p.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
