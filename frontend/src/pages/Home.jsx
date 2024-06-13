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

      <div class="h-[350px] mt-6 max-w-full grid grid-cols-12 gap-4 relative bg-[#D871A1] ">
        <div class="section_banner flex justify-start  items-center  h-auto w-full col-span-6 md:col-span-4 sm:col-span-12"></div>

        <div class="flex justify-start  items-center sm:absolute col-span-6 md:col-span-8 sm:col-span-11 p-8 sm:mt-20 sm:justify-center text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
          eiusmod tempor incididun
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
