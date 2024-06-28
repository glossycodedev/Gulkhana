import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { backend_url_img } from '../../api/server';
import cookies from 'js-cookie';

const SlideProducts = ({ title, reklams }) => {
  const currentLanguageCode = cookies.get('i18next') || 'en';
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

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-slate-200  px-12"> </div>
        <div className="flex justify-center items-center gap-3 text-slate-200  px-8">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-[#B65278] hover:text-black hover:bg-[#c78aa1] border border-slate-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-[#B65278] hover:text-black hover:bg-[#c78aa1] border border-slate-200"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-3 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        rtl={currentLanguageCode === 'en' ? false : true}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {reklams?.map((reklam,i) => (
          <div key={i} className="h-[350px]  max-w-full grid grid-cols-12 gap-4 sm:gap-0 relative bg-[#D871A1] ">
            <div className="flex justify-center z-50 items-center  h-full w-full col-span-6 md:col-span-4 sm:col-span-12 ">
              <img
                src={`${backend_url_img}/uploads/${reklam.image}`}
                className=" h-[350px] w-auto  ml-20 z-10 sm:opacity-50"
                alt=""
              />
            </div>

            <div className="w-full sm:absolute col-span-6 md:col-span-8 sm:col-span-12 p-6  z-50 text-white ">
              <div>
                <div className="py-1">
                  <h2 className="flex justify-center py-8 w-full items-center text-4xl font-bold">
                    {reklam.title}
                    <h2 className="text-4xl font-bold text-black mx-2">
                      20% Off
                    </h2>
                  </h2>
                  <h2 className="flex justify-center w-full items-center sm:line-clamp-3">
                    {reklam.description}
                  </h2>
                </div>
                <div className="flex justify-center items-center py-4">
                  <Link
                    className="px-8 py-3 bg-[#ffffff] hover:bg-[#000000] hover:text-[#ffffff] rounded-sm text-black"
                    to="/shops"
                  >
                    {' '}
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideProducts;
