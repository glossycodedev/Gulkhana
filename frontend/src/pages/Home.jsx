import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, get_reklams } from '../store/reducers/homeReducer';
import { useTranslation } from 'react-i18next';
import SlideProducts from '../components/products/SlideProducts';
import { backend_url_img } from '../api/server';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    products,
    reklams,
    latest_product,
    topRated_product,
    discount_product,
  } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
    dispatch(get_reklams());
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Banner />

      <Categorys />

      <div className=" py-[45px]">
        <FeatureProducts products={products} />
      </div>

      {/* <div className="h-[350px] mt-6 max-w-full grid grid-cols-12 gap-4 sm:gap-0 relative bg-[#D871A1] ">
        {reklams?.map((reklam) => (
          <>
            <div className="flex justify-center  items-center  h-full w-full col-span-6 md:col-span-4 sm:col-span-12 ">
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
                  <h2 className="flex justify-center w-full items-center ">
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
          </>
        ))}
      </div> */}
      <div className="py-10">
        <div className="w-full flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-1 md-lg:grid-cols-1 md:grid-cols-1 gap-3">
            <div className="overflow-hidden">
              <SlideProducts
                title={t('home.latest_products')}
                reklams={reklams}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="w-[70%] sm:w-[90%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products
                title={t('home.latest_products')}
                products={latest_product}
              />
            </div>

            <div className="overflow-hidden">
              <Products
                title={t('home.top_products')}
                products={topRated_product}
              />
            </div>

            <div className="overflow-hidden">
              <Products
                title={t('home.discount_products')}
                products={discount_product}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
