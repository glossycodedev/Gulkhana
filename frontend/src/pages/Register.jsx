import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from 'react-icons/fa6';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { IoIosArrowForward } from 'react-icons/io';

const Register = () => {
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate('/');
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}

      <Header />
      <section>
        <div className=" bg-[#F8F9F9] py-5 mb-5 mt-8">
          <div className="w-[70%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full">
              <Link to="/">Home</Link>
              <span>
                <IoIosArrowForward />
              </span>
              <span className="text-[#B65278]">Register</span>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-1 w-[25%] mx-auto bg-[#F8F9F9] shadow-sm rounded-md">
            <div className="px-6 py-6">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Register{' '}
              </h2>

              <div>
                <form onSubmit={register} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <button className="px-8 w-full py-2 mt-4 bg-[#B65278] shadow-lg hover:bg-[#522436] hover:text-white text-white rounded-md">
                    Register
                  </button>
                </form>
                <div className="flex justify-center items-center py-6">
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                  {/* <span className="px-3 text-slate-600">Or</span> */}
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                </div>
              </div>

              <div className="text-center text-slate-600 pt-1">
                <p>
                  You Have an Account?{' '}
                  <Link className="text-blue-500" to="/login">
                    {' '}
                    Login
                  </Link>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
