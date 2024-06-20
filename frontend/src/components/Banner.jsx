import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { backend_url_img } from '../api/server';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow text-[#242122]  px-4 rounded-md hover:text-[#ffffff] py-3 custom-left-arrow-banner"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button
        className="custom-arrow  text-[#242122] px-4 py-3 rounded-md hover:text-[#ffffff] custom-right-arrow-banner"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  };

  useEffect(() => {
    dispatch(get_banners());
  }, []);

  return (
    <div className="w-full md-lg:mt-6 sm:mt-0">
      <div className="w-[100%] lg:w-[100%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-0">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
              >
                {banners.length > 0 &&
                  banners.map((b, i) => (
                    <Link key={i} to={`product/details/${b.image}`}>
                      <img
                        src={`${backend_url_img}/uploads/${b.image}`}
                        alt=""
                      />
                    </Link>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
