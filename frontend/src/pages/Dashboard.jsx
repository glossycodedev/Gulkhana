import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaList } from 'react-icons/fa';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosArrowForward, IoIosHome } from 'react-icons/io';
import { FaBorderAll } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';
import { RiLockPasswordLine } from 'react-icons/ri';
import api from '../api/api';
import { useDispatch } from 'react-redux';
import { user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cardReducer';

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchValue = searchParams.get('value');
  const logout = async () => {
    try {
      const { data } = await api.get('/customer/logout');
      localStorage.removeItem('customerToken');
      dispatch(user_reset());
      dispatch(reset_count());
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Header />
      <section>
        <div className=" bg-[#F8F9F9] py-5 mt-8 mb-5">
          <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full">
              <Link to="/">Home</Link>
              <span>
                <IoIosArrowForward />
              </span>

              <span className="text-[#B65278]">{searchValue}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#ffffff]">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-[#B65278] text-white"
            >
              <FaList />{' '}
            </button>
          </div>
        </div>

        <div className="w-[70%] sm:w-full h-full mx-auto">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? '-left-4 top-0 bg-[#f5d8e6] ' : '-left-[360px]'
              } w-[270px] ml-4 bg-[#F8F9F9]`}
            >
              <ul className="py-2 text-slate-600 px-4">
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoIosHome />
                  </span>
                  <Link to="/dashboard" className="block">
                    Dashboard{' '}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaBorderAll />
                  </span>
                  <Link to="/dashboard/my-orders" className="block">
                    My Orders{' '}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <Link to="/dashboard/my-wishlist" className="block">
                    Wishlist{' '}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoChatbubbleEllipsesSharp />
                  </span>
                  <Link to="/dashboard/chat" className="block">
                    Chat{' '}
                  </Link>
                </li>
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <RiLockPasswordLine />
                  </span>
                  <Link to="/dashboard/change-password" className="block">
                    Change Password{' '}
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-2 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <IoMdLogOut />
                  </span>
                  <div className="block">Logout </div>
                </li>
              </ul>
            </div>

            <div className="w-[calc(100%-270px)] md-lg:w-full sm:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
