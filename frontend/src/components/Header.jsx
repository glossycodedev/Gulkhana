import React, { useEffect, useState } from 'react';
import { MdEmail, MdOutlineLanguage } from 'react-icons/md';
import { IoMdPhonePortrait } from 'react-icons/io';
import { FaFacebookF, FaList, FaLock, FaUser } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_card_products,
  get_wishlist_products,
} from '../store/reducers/cardReducer';
import { backend_url_img } from '../api/server';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';

import { Ripple, initTWE } from 'tw-elements';
import { CiSearch } from 'react-icons/ci';

initTWE({ Ripple });

const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'en',
    image: '../../../images/language.png',
  },
  {
    code: 'kr',
    name: 'کوردی',
    dir: 'rtl',
    country_code: 'kr',
    image: '../../../images/kur.png',
  },
];

const Header = () => {
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  const { pathname } = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(true);
  const [searchActive, setSearchActive] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('home.app_title');
  }, [currentLanguage, t]);

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate('/card');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
    setSearchActive(false);
  }, [userInfo]);

  useEffect(() => {
    const mybutton = document.getElementById('btn-back-to-top');

    if (mybutton) {
      const scrollFunction = () => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          mybutton.classList.remove('hidden');
        } else {
          mybutton.classList.add('hidden');
        }
      };

      const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      mybutton.addEventListener('click', backToTop);
      window.addEventListener('scroll', scrollFunction);

      // Cleanup function to remove event listeners
      return () => {
        mybutton.removeEventListener('click', backToTop);
        window.removeEventListener('scroll', scrollFunction);
      };
    }
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headerLogo = '../../../images/logo.png';
  const langlogo = '../../../images/language.png';
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#FEEAF1] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500 rtl:space-x-reverse">
            <div className="flex justify-center items-center gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />{' '}
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaGithub />{' '}
              </a>
            </div>

            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src={langlogo} alt="" />
                  {/* <MdOutlineLanguage /> */}
                  <span>
                    <IoMdArrowDropdown />
                  </span>
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-black p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-[#F9FBFE] z-10">
                    {languages.map(({ code, name, country_code, image }) => (
                      <li key={country_code}>
                        <a
                          href="/"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            i18next.changeLanguage(code);
                          }}
                          disabled={code === currentLanguageCode}
                        >
                          <div className="flex justify-between">
                          {name}<img src={image} alt={`${name} logo`} />
                          </div>
                          
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {userInfo ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/dashboard"
                  >
                    <span>
                      {' '}
                      <FaUser />{' '}
                    </span>
                    <span> {userInfo.name} </span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  >
                    <span>
                      {' '}
                      <FaLock />{' '}
                    </span>
                    <span>{t('home.login')} </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm z-50 ">
        <div className="w-[75%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img
                    // src="http://localhost:3001/images/logo.png"
                    src={headerLogo}
                    className="w-[190px] h-[80px]"
                    alt=""
                  />
                  {/* <img src="http://localhost:3001/images/logo.png" alt="" /> */}
                </Link>
                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowShidebar(false)}
                >
                  <span>
                    {' '}
                    <FaList />{' '}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-4 text-sm rtl:text-lg font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === '/' ? 'text-[#B65278]' : 'text-slate-600'
                      } `}
                    >
                      {t('home.home')}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === '/shops'
                          ? 'text-[#B65278]'
                          : 'text-slate-600'
                      } `}
                    >
                      {t('home.shop')}
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/blog'
                          ? 'text-[#B65278]'
                          : 'text-slate-600'
                      } `}
                    >
                      Blog
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/about'
                          ? 'text-[#B65278]'
                          : 'text-slate-600'
                      } `}
                    >
                      {t('home.about_us')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/contact'
                          ? 'text-[#B65278]'
                          : 'text-slate-600'
                      } `}
                    >
                      {t('home.contact_us')}
                    </Link>
                  </li>
                </ul>

                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <span
                      onClick={() => setSearchActive(!searchActive)}
                      className="text-3xl cursor-pointer text-[#B65278]"
                    >
                      <CiSearch />
                    </span>
                  </div>
                </div>
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={() =>
                        navigate(userInfo ? '/dashboard/my-wishlist' : '/login')
                      }
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-[#B65278]">
                        <FaHeart />
                      </span>

                      {wishlist_count !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                          {wishlist_count}
                        </div>
                      )}
                    </div>

                    <div
                      onClick={redirect_card_page}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-[#B65278]">
                        <FaCartShopping />
                      </span>

                      {card_product_count !== 0 && (
                        <div
                          className={`w-[20px] h-[20px]  absolute bg-red-500  rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] `}
                        >
                          {card_product_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowShidebar(true)}
          className={`fixed duration-200 transition-all ${
            showShidebar ? 'invisible' : 'visible'
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}
        ></div>

        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showShidebar ? '-left-[300px]' : 'left-0 top-0'
          } overflow-y-auto bg-white h-screen py-6 px-8 `}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img
                // src="http://localhost:3001/images/logo.png"
                src={headerLogo}
                className="w-[190px] h-[70px]"
                alt=""
              />
            </Link>
            <div className="flex justify-start items-center gap-10">
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute ">
                <img src="http://localhost:3000/images/language.png" alt="" />
                <span>
                  <IoMdArrowDropdown />
                </span>
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  {languages.map(({ code, name, country_code }) => (
                    <li key={country_code}>
                      <a
                        href="/"
                        className="dromdown-item "
                        onClick={() => i18next.changeLanguage(code)}
                        disabled={code === currentLanguageCode}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {userInfo ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/dashboard"
                >
                  <span>
                    {' '}
                    <FaUser />{' '}
                  </span>
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm  text-black"
                  to="/login"
                >
                  <span>
                    {' '}
                    <FaLock />{' '}
                  </span>
                  <span>{t('home.login')} </span>
                </Link>
              )}
            </div>

            <ul className="flex flex-col justify-start items-start text-sm rtl:text-lg font-bold uppercase">
              <li>
                <Link
                  to="/"
                  className={`py-2 block ${
                    pathname === '/' ? 'text-[#B65278]' : 'text-slate-600'
                  } `}
                >
                  {t('home.home')}
                </Link>
              </li>

              <li>
                <Link
                  to="/shops"
                  className={`py-2 block ${
                    pathname === '/shops' ? 'text-[#B65278]' : 'text-slate-600'
                  } `}
                >
                  {t('home.shop')}
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`py-2 block ${
                    pathname === '/blog' ? 'text-[#B65278]' : 'text-slate-600'
                  } `}
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === '/about' ? 'text-[#B65278]' : 'text-slate-600'
                  } `}
                >
                  {t('home.about_us')}
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === '/contact'
                      ? 'text-[#B65278]'
                      : 'text-slate-600'
                  } `}
                >
                  {t('home.contact_us')}
                </Link>
              </li>
              <div className="flex  justify-center items-center gap-5">
                <div className="flex justify-center gap-5">
                  <span
                    onClick={() => setSearchActive(!searchActive)}
                    className="text-3xl cursor-pointer text-[#B65278]"
                  >
                    <CiSearch />
                  </span>
                </div>
              </div>
            </ul>

            <div className="flex justify-start items-center gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />{' '}
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaGithub />{' '}
              </a>
            </div>

            {/* <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  +134343455
                </h2>
                <span className="text-xs">Support 24/7</span>
              </div>
            </div> */}

            {/* <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
            </ul> */}
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] flex justify-center items-center mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          {/* <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#B65278] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md  rtl:text-lg cursor-pointer"
              >
                <div className="flex justify-center items-center gap-3 rtl:space-x-reverse">
                  <span>
                    <FaList />
                  </span>
                  <span>{t('home.all_category')} </span>
                </div>
                <span className="pt-1">
                  <IoIosArrowDown />
                </span>
              </div>

              <div
                className={`${
                  categoryShow ? 'h-0' : 'h-auto'
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#fcfdfd] w-full  border-x `}
              >
                <ul className="py-2 text-slate-600 font-medium ">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px] "
                      >
                        <img
                          src={`${backend_url_img}/uploads/categories/${c.image}`}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          alt=""
                        />
                        <Link
                          to={`/products?category=${c.name}`}
                          className="text-sm block"
                        >
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div> */}
          {searchActive && (
            <div className="w-full py-2 flex justify-center items-center">
              <div className="flex flex-wrap w-full justify-center items-center ">
                <div className="w-8/12 sm:w-full bg-[#F6F7F7]  md-lg:w-full">
                  <div className="flex border h-[50px] items-center relative gap-2 ">
                    <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] rtl:after:-right-[-155px] md:hidden">
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                        name=""
                        id=""
                      >
                        <option value="">{t('home.select_category')}</option>
                        {categorys.map((c, i) => (
                          <option key={i} value={c.name}>
                            {' '}
                            {c.name}{' '}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full rtl:space-x-reverse"
                      onChange={(e) => setSearchValue(e.target.value)}
                      type="text"
                      name=""
                      id=""
                      placeholder={t('home.need')}
                    />
                    <button
                      onClick={search}
                      className="bg-[#B65278]  px-8 h-full font-semibold uppercase text-white ltr:right-0 rtl:left-0"
                    >
                      {t('home.search')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={backToTop}
        type="button"
        data-twe-ripple-init
        data-twe-ripple-color="light"
        className="!fixed bottom-5 sm:bottom-32 end-3  z-10 hidden rounded-full bg-[#B65278] p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-[#D871A1] hover:shadow-lg focus:bg-[#D871A1]  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#D871A1]  active:shadow-lg"
        id="btn-back-to-top"
      >
        <span className="[&>svg]:w-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Header;
