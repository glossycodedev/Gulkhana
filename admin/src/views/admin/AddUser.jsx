import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';
// import { seller_register } from '../../store/Reducers/sellerReducer';
import { FaEdit, FaEye, FaImage, FaTrash } from 'react-icons/fa';
import {
  admin_image_upload,
  admin_register,
  admin_update,
  delete_admin_user,
  get_admin_users,
} from '../../store/Reducers/authReducer';
import { backend_url_img } from '../../api/server';

const AddUser = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [userId, setUserId] = useState('');
  const [imageShow, setImage] = useState('');
  const [state, setState] = useState({
    name: '',
    phone: '',
    password: '',
    image: '',
  });

  const {
    loader,
    successMessage,
    errorMessage,
    adminUsers,
    totalAdmin,
    adminUser,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_users(obj));
  }, [searchValue, currentPage, parPage, adminUser]);

  //   console.log(adminUsers, searchValue);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandle = (img, files) => {
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (userId) {
      const obj = {
        name: state.name,
        phone: state.phone,
        password: state.password,
        userId: userId,
      };

      dispatch(admin_update(obj));
    } else {
      const formData = new FormData();
      formData.append('name', state.name);
      formData.append('phone', state.phone);
      formData.append('password', state.password);
      formData.append('image', state.image);
      dispatch(admin_register(formData));
    }

    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_users(obj));
  };

  const add_image = (e) => {
    if (userId) {
      dispatch(
        admin_image_upload({ image: e.target.files[0], userId: userId })
      );
      dispatch(messageClear());
    }
  };

  const deleteUser = (id) => {
    dispatch(delete_admin_user({ userId: id }));
   
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: '',
        phone: '',
        password: '',
        image: '',
      });
      setImage('');
      setUserId('');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, , adminUser]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Add User</h2>
      </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">User Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="text"
                  name="name"
                  placeholder="Name"
                  id="name"
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="phone">Phone</label>
                <input
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#5c5a5a]">
              <div className="flex flex-col justify-start w-full gap-1 relative">
                <label htmlFor="password">Password</label>
                <input
                  onChange={inputHandle}
                  value={state.password}
                  className="px-3 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>
            </div>

            <div className="flex justify-start items-center py-3">
              <label
                className="flex justify-center items-center flex-col h-[150px] w-[150px] cursor-pointer border border-dashed hover:border-red-500  border-[#d0d2d6]"
                htmlFor="image"
              >
                {imageShow ? (
                  <img className="w-full h-full" src={imageShow} alt="" />
                ) : (
                  <>
                    <span>
                      <FaImage />{' '}
                    </span>
                    <span>Select Logo</span>
                  </>
                )}
              </label>
              <input
                onChange={(e) => {
                  imageHandle(imageShow, e.target.files);
                  add_image(e);
                }}
                // onChange={imageHandle}
                className="hidden"
                type="file"
                name="image"
                id="image"
              />
            </div>

            <div className="flex">
              <button
                disabled={loader ? true : false}
                // className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
                className="bg-[#2A629A] w-[200px] hover:bg-[#313A46]  hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  'Add User'
                )}
              </button>
            </div>
          </form>
          {/* <div className="px-7 ">
            <button
              onClick={add_image}
              disabled={loader ? true : false}
              // className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
              className=" bg-[#36ae5c] w-[200px] hover:bg-[#384631]  hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                'Edit Image'
              )}
            </button>
          </div> */}
        </div>
      </div>
      <div className="w-full mt-4 p-4 bg-[#ffffff] shadow-md rounded-md">
      <div className="flex pb-3 mt-4 justify-between items-center">
        <div className="flex gap-3 items-center">
          <h2 className="text-md text-[#5c5a5a]">Display</h2>
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
            type="text"
            placeholder="search"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left text-[#d0d2d6] ">
          <thead className="text-sm text-[#5c5a5a] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
            <tr>
              <th scope="col" className="py-3 px-4">
                No
              </th>

              <th scope="col" className="py-3 px-4">
                User Name
              </th>
              <th scope="col" className="py-3 px-4">
                Image
              </th>
              <th scope="col" className="py-3 px-4">
                Phone
              </th>
              <th scope="col" className="py-3 px-4">
                Role
              </th>

              <th scope="col" className="py-3 px-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {adminUsers?.map((d, i) => (
              <tr
                key={i}
                className="text-[#595b5d] text-lg border-b  border-[#dcdada]"
              >
                <td className="py-2 px-4  whitespace-nowrap">{i + 1}</td>

                <td className="py-1 px-4 whitespace-nowrap">{d.name} </td>
                <td className="py-2 px-4  whitespace-nowrap">
                  <img
                    className="w-[50px] h-[50px]"
                    src={`${backend_url_img}/uploads/${d.image}`}
                    alt=""
                  />
                </td>
                <td className="py-1 px-4 whitespace-nowrap">{d.phone}</td>
                {/* <td className="py-1 px-4  whitespace-nowrap">
                    <span>{d.payment}</span>{' '}
                  </td> */}
                <td className="py-1 px-4 whitespace-nowrap">{d.role} </td>

                <td className="py-1 px-4  whitespace-nowrap">
                  <div className="flex justify-start items-center gap-4">
                    <div
                      onClick={(e) => {
                        setState({
                          name: d.name,
                          phone: d.phone,
                        });
                        setImage(`${backend_url_img}/uploads/${d.image}`);
                        setUserId(d._id);
                        console.log(userId);
                        // setCategoryName(d.name);
                        // console.log(imageShow);
                      }}
                      className="p-[6px] bg-[#2A629A] cursor-pointer rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                    >
                      {' '}
                      <FaEdit />{' '}
                    </div>
                    <div
                      onClick={() => {
                        deleteUser(d._id);
                      }}
                      className="p-[6px] text-[#C40C0C]"
                    >
                      {' '}
                      <FaTrash />{' '}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {totalAdmin <= parPage ? (
        ''
      ) : (
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalAdmin}
            parPage={parPage}
            showItem={5}
          />
        </div>
      )}
    </div>
  );
};

export default AddUser;
