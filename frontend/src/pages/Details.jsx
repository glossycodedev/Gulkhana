import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Rating from '../components/Rating';
import { FaHeart } from 'react-icons/fa6';
import { FaEye, FaFacebookF, FaRegHeart } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import Reviews from '../components/Reviews';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from '../store/reducers/cardReducer';
import { RiShoppingCartLine } from 'react-icons/ri';
import { backend_url_img } from '../api/server';
import { CiHeart } from 'react-icons/ci';

const Details = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, relatedProducts, moreProducts, totalReview } = useSelector(
    (state) => state.home
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);
  

  useEffect(() => {
    dispatch(product_details(slug));
  }, [slug]);

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

  const [image, setImage] = useState('');
  // const discount = 10;
  // const stock = 3;
  const [state, setState] = useState('reviews');

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 3,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 3,
    },
  };

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error('Out of Stock');
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const add_card = () => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate('/login');
    }
  };

  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate('/login');
    }
  };

  const buynow = () => {
    let price = 0;
    if (product.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }

    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];

    navigate('/shipping', {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 3,
        items: 1,
      },
    });
  };

  return (
    <div>
      <Header />
      <section className=" mt-8 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              {/* <h2 className="text-3xl font-bold">Product Details </h2> */}
              {/* <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Product Details </span>
              </div> */}
            </div>
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
              <Link to="/">{product.category}</Link>
              <span>
                <IoIosArrowForward />
              </span>
              <span className="text-[#B65278]">{product.name} </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto  pb-16">
          <div className="justify-start grid grid-cols-2 sm:grid-cols-1 gap-8">
            <div>
              <div className="p-1 h-auto overflow-hidden">
                <img
                  className="h-[600px] sm:h-auto w-full transition-transform duration-300 transform hover:scale-125 peer"
                  src={
                    image
                      ? `${backend_url_img}/uploads/${image}`
                      : `${backend_url_img}/uploads/${product.images?.[0]}`
                  }
                  // {image ? image : product.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3 px-0">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    arrows={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product.images.map((img, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => setImage(img)}
                          className={`focus:border-blue border-solid cursor-pointer ml-4 ${
                            image === img ? 'border-blue-500' : ''
                          }`}
                        >
                          <img
                            className="h-auto w-full cursor-pointer "
                            src={`${backend_url_img}/uploads/${img}`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-lg text-slate-600 font-bold">
                <h3>{product.name} </h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-green-500">({totalReview} reviews)</span>
              </div>

              <div className="text-lg text-black  flex gap-3">
              {product.discount !== 0 ? (
                  <>
                  <h2 className="">
                  Price :  $
                      {product.price -
                        Math.floor(
                          (product.price * product.discount) / 100
                        )}{' '}
                     
                    </h2>
                     <h2 className="line-through px-3 text-[#B65278]">${product.price}</h2>
                    
                  </>
                ) : (
                  <h2>  ${product.price} </h2>
                )}
                {/* {product.discount !== 0 ? (
                  <>
                    Price : <h2 className="line-through">${product.price}</h2>
                    <h2>
                      $
                      {product.price -
                        Math.floor(
                          (product.price * product.discount) / 100
                        )}{' '}
                      (-{product.discount}%){' '}
                    </h2>
                  </>
                ) : (
                  <h2> Price : ${product.price} </h2>
                )} */}
              </div>
              <div className="flex py-1 gap-4">
                <div className=" text-black  text-lg flex flex-col">
                  <span>Availability</span>
                              </div>
                <div className="flex flex-col">
                  <span
                    className={`text-${product.stock ? 'green' : 'red'}-500`}
                  >
                    {product.stock
                      ? `In Stock(${product.stock})`
                      : 'Out Of Stock'}
                  </span>
                </div>
</div>
              <div className="text-slate-600">
                <p>{product.description} </p>
                <p className="text-slate-600 py-1 font-bold">
                  Shop Name : {product.shopName}
                </p>
              </div>
              

              <div className="flex gap-3 pb-10 border-b">
                {product.stock ? (
                  <>
                    <div className="flex bg-[#F8F9F9] py-[7px] border justify-center items-center text-xl">
                      <div onClick={dec} className="px-6 cursor-pointer">
                        -
                      </div>
                      <div className="px-6">{quantity}</div>
                      <div onClick={inc} className="px-6 cursor-pointer">
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={add_card}
                        className="px-7 py-[10px] bg-[#256236] hover:bg-[#0e0f0f]  hover:text-[#ffffff] rounded-sm text-white"
                        // className="px-4 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                      >
                        Add To Card
                      </button>
                    </div>
                  </>
                ) : (
                  ''
                )}

                <div>
                  <div
                    onClick={add_wishlist}
                    className="py-[8px] px-4 flex justify-center items-center cursor-pointer hover:shadow-lg rounded-sm hover:text-white  hover:bg-[#B65278] bg-[#F8F9F9] text-black"
                  >
                    <CiHeart className="text-black size-7" />
                  </div>
                </div>
              </div>

              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black  text-lg flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span
                    className={`text-${product.stock ? 'green' : 'red'}-500`}
                  >
                    {product.stock
                      ? `In Stock(${product.stock})`
                      : 'Out Of Stock'}
                  </span>

                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                        href="#"
                      >
                        {' '}
                        <FaFacebookF />{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                        href="#"
                      >
                        {' '}
                        <FaTwitter />{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
                        href="#"
                      >
                        {' '}
                        <FaLinkedin />{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
                        href="#"
                      >
                        {' '}
                        <FaGithub />{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                {product.stock ? (
                  <button
                    onClick={buynow}
                    className="px-10 py-[10px] bg-[#B65278] hover:bg-[#0e0f0f]  hover:text-[#ffffff] rounded-sm text-white"
                    // className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                  >
                    Buy Now
                  </button>
                ) : (
                  ''
                )}
                {/* <Link
                  to={`/dashboard/chat/${product.sellerId}`}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                >
                  Chat Seller
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-full md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState('description')}
                    className={`py-1 hover:text-black px-5  border-b-2 ${
                      state === 'description'
                        ? 'bg-slate-200 text-slate-700 border-b-[#B65278]'
                        : 'hover:border-b-[#B65278] text-black '
                    } rounded-sm`}
                  >
                    Description{' '}
                  </button>
                  <button
                    onClick={() => setState('reviews')}
                    className={`py-1 hover:text-black px-5 border-b-2 ${
                      state === 'reviews'
                        ? 'bg-slate-200 text-slate-700 border-b-[#B65278]'
                        : 'hover:border-b-[#B65278] text-black'
                    } rounded-sm`}
                  >
                    Reviews{' '}
                  </button>
                </div>

                <div>
                  {state === 'reviews' ? (
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2 className="font-bold">From {product.shopName}</h2>
                </div>
                <div className="flex flex-col gap-5 mt-3 border p-3">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link className="block">
                        <div className="relative h-[270px]">
                          <Link
                            to={`/product/details/${p.slug}`}
                            className="cursor-pointer bg-white rounded-full hover:bg-[#059473] hover:text-white opacity-90 hover:opacity-50 transition-all duration-500"
                          >
                            <img
                              className="w-full h-full"
                              src={p.images[0]}
                              alt=""
                            />
                          </Link>

                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {p.discount}%
                            </div>
                          )}
                        </div>

                        <h2 className="text-slate-600 py-1 font-bold">
                          {p.name}{' '}
                        </h2>
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${p.price}
                          </h2>
                          <div className="flex items-center gap-2">
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%]  mx-auto">
          <h2 className="text-2xl py-8 text-slate-600">Related Products </h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 5,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: '.custom_bullet',
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link to={`/product/details/${p.slug}`} className="block ">
                      <div className="relative h-[270px]">
                        <div className=" w-full h-full ">
                          <img
                            className="w-full h-full"
                            src={`${backend_url_img}/uploads/${p.images?.[0]}`}
                            alt=""
                          />
                          {/* <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                            <li
                              onClick={() => add_wishlist(p)}
                              className="w-[38px] h-[38px]  cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                            >
                              <FaRegHeart />
                            </li>
                            <Link
                              to={`/product/details/${p.slug}`}
                              className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                            >
                              <FaEye />
                            </Link>
                            <li
                              onClick={() => add_card(p._id)}
                              className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                            >
                              <RiShoppingCartLine />
                            </li>
                          </ul> */}
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                        </div>
                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {p.discount}%
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col gap-1">
                        <h2 className="text-slate-600 text-lg font-bold">
                          {p.name}{' '}
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${p.price}
                          </h2>
                          <div className="flex">
                            <Rating ratings={p.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="w-full flex justify-center items-center py-8">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
