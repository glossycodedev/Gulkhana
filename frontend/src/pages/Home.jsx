import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';
import { useTranslation } from 'react-i18next';
import SlideProducts from '../components/products/SlideProducts';
import { backend_url_img } from '../api/server';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, latest_product, topRated_product, discount_product } =
    useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Categorys />
      <div className=" py-[45px]">
        <FeatureProducts products={products} />
      </div>

      <div class="h-[350px] mt-6 max-w-full grid grid-cols-12 gap-4 sm:gap-0 relative bg-[#D871A1] ">
        <div class="flex justify-center  items-center  h-full w-full col-span-6 md:col-span-4 sm:col-span-12 ">
          <img
            src="http://localhost:5000/uploads/www-1718291010676-968020147.png"
            className=" h-[350px] w-auto  ml-20 z-10 sm:opacity-50"
            alt=""
          />
        </div>

        <div class="w-full sm:absolute col-span-6 md:col-span-8 sm:col-span-12 p-6  z-50 text-white ">
        <div className="py-6">
          <h2 className='flex justify-center py-8 w-full items-center text-4xl font-bold'>Sale Up To <h2 className='text-4xl font-bold text-black mx-2'>20% Off</h2></h2>
         <h2 className='flex justify-center w-full items-center '> Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
         eiusmod tempor incididun</h2>
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

      <div className="py-20">
        <div className="w-[70%] flex flex-wrap mx-auto">
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
