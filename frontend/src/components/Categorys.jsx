import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url_img } from '../api/server';
import { useTranslation } from 'react-i18next';

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

  return (
    <div className="w-[80%] mx-auto relative mt-5">
      <div className="w-full">
        <div className="text-center  flex justify-center items-center flex-col text-2xl text-slate-600 font-bold relative pb-[20px]">
          <h2>{t('home.shop_category')} </h2>
          <div className="w-[100px] h-[2px]   bg-[#B65278] mt-4"></div>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys?.map((c, i) => (
          <Link className=" " key={i} to={`/products?category=${c.name}`}>
            <div className=" rounded-t-full relative p-3 ">
              <img
                src={`${backend_url_img}/uploads/categories/${c.image}`}
                alt=""
                className="w-full h-full rounded-md transition-transform duration-1000 hover:scale-110"
              />
            </div>
            <div className="absolute bottom-2 w-full  mx-auto font-bold left-0 flex justify-center items-center">
              <span className="py-[2px] rounded-md px-6 bg-[#F9CEDF] text-black">
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
