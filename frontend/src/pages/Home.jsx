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
      <div className=" py-[30px] mt-4">
        <FeatureProducts products={products} />
      </div>

      <div className="py-10 sm:py-4">
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
