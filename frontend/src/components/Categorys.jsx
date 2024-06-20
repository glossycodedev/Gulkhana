import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url_img } from '../api/server';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Categorys = () => {
  const { t } = useTranslation();
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 2,
    },
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow   px-4 rounded-md  py-3 custom-left-arrow"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow  px-4 py-3 rounded-md  custom-right-arrow"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  };

  return (
    <div className="w-[70%] sm:w-[90%] mx-auto relative mt-14 sm:mt-8">
      <div className="w-full">
        <div className="text-center  flex justify-center items-center flex-col text-2xl sm:text-lg text-slate-600 font-bold relative pb-[20px]">
          <h2>{t('home.shop_category')} </h2>
          <div className="w-[100px] h-[2px]   bg-[#B65278] mt-4"></div>
        </div>
      </div>

      <Carousel
        autoPlay={false}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {categorys?.map((c, i) => (
          
            <Link className="w-full" key={i} to={`/products?category=${c.name}`}>
              <div className=" rounded-t-full relative p-3 flex justify-center items-center">
                <img
                  src={`${backend_url_img}/uploads/categories/${c.image}`}
                  alt=""
                  className="w-full h-full rounded-md transition-transform duration-1000 hover:scale-110"
                />
              </div>
              <div className="absolute bottom-2 w-full  mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-[2px] w-[70%] rounded-md px-6 bg-[#F9CEDF] text-black flex justify-center items-center">
                  {c.name}
                </span>
              </div>
            </Link>
         
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
