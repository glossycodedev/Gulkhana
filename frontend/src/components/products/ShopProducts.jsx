import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import Rating from '../Rating';
import { backend_url_img } from '../../api/server';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/reducers/cardReducer';

const ShopProducts = ({ styles, products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    <div
      className={`w-full grid ${
        styles === 'grid'
          ? 'grid-cols-4 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'
      } gap-3 `}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex border  transition-all duration-1000 hover:shadow-md hover:-translate-y-1 ${
            styles === 'grid'
              ? 'flex-col justify-start items-start'
              : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'
          } w-full gap-4 bg-white  rounded-md`}
        >
          <div
            className={
              styles === 'grid'
                ? 'w-full relative group h-auto  overflow-hidden'
                : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'
            }
          >
             <Link to={`/product/details/${p.slug}`}>
             <img
              className="h-[260px] rounded-md  w-full object-cover"
              src={`${backend_url_img}/uploads/${p.images[0]}`}
              alt=""
            />
             </Link>
           

            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li onClick={() => add_wishlist(p)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white transition-all">
                <FaRegHeart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white transition-all">
              <Link
                    to={`/product/details/${p.slug}`}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white  transition-all"
                  >
                    <FaEye />
                  </Link>
              </li>
              <li onClick={() => add_card(p._id)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#B65278] hover:text-white transition-all">
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>

          <div className="flex justify-start items-start flex-col gap-1 p-2">
            <h2 className="font-bold">{p.name}</h2>
            <div className="flex justify-start items-center gap-3">
              <span className="text-md font-semibold">${p.price}</span>
              <div className="flex">
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
