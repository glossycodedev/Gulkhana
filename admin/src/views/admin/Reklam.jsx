import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
// import { FaE } from 'react-icons/fa6';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaImage } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';

import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from '../components/Search';
import { backend_url_img } from '../../api/server';
import { get_reklam, messageClear, reklamAdd } from '../../store/Reducers/reklamReducer';

const Reklam = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, reklams, reklam } = useSelector(
    (state) => state.reklam
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState('');
  const [reklamId, setReklamId] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [reklamName, setReklamName] = useState('');
  const [state, setState] = useState({
    title: '',
    description: '',
    image: '',
  });

  const imageHandle = (img, files) => {
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };
  const add_reklam = (e) => {
    e.preventDefault();
    if (reklamId) {
      const obj = {
        title: state.title,
        description: state.description,
        image: state.image,
        reklamId: reklamId,
      };
      if (state.image) {
        // dispatch(categoryUpdate(obj));
      }
    } else {
      dispatch(
        reklamAdd({
          title: state.title,
          description: state.description,
          image: state.image,
        })
      );
    }
    ClearAll();
  };

  const ClearAll = () => {
    setOldImage('');
    setNewImage('');
    setReklamName('');
    setReklamId('');
    setState({
      title: '',
      description: '',
      image: '',
    });
    setImage('');
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());

      setImage('');
      ClearAll();
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

    useEffect(() => {
      const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      };
      dispatch(get_reklam(obj));
    }, [searchValue, currentPage, parPage, reklam]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Reklams</h2>
      </div>
      <div className="flex lg:hidden justify-between items-center shadow-md mb-5 p-4 bg-[#ffffff] rounded-md">
        <h1 className="text-[#5c5a5a] font-semibold text-lg">Reklam</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full ">
        <div className="w-full lg:w-7/12 ">
          <div className="w-full p-4 bg-[#ffffff] rounded-md shadow-md">
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left  text-[#d0d2d6]">
                <thead className="text-sm text-[#595b5d] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Title
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Description
                    </th>
                    <th scope="col" className=" text-right  py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reklams.map((d, i) => (
                    <tr
                      key={i}
                      className=" border-b text-lg text-[#595b5d] border-[#dcdada]"
                    >
                      <td scope="row" className="py-1 px-4  whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td scope="row" className="py-1 px-4 whitespace-nowrap">
                        <img
                          className="w-[45px] h-[45px]"
                          src={`${backend_url_img}/uploads/${d.image}`}
                          alt=""
                        />
                      </td>
                      <td scope="row" className="py-1 px-4 whitespace-nowrap">
                        {d.title}
                      </td>
                      <td scope="row" className="py-1 px-4 whitespace-nowrap">
                        {d.description}
                      </td>

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-end items-center text-[#d0d2d6] gap-2">
                          <div
                            onClick={(e) => {
                              setState({
                                id: d._id,
                                title: d.title,
                                description: d.description,
                                // image: `${backend_url_img}/uploads/${d.image}`,
                                // image: `${backend_url_img}/uploads/${d.image}`,
                              });
                              setImage(
                                `${backend_url_img}/uploads/${d.image}`
                              );
                              setReklamId(d._id);
                              setReklamName(d.name);
                              // console.log(imageShow);
                            }}
                            className="p-[6px] bg-[#2A629A] cursor-pointer rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                          >
                            {' '}
                            <FaEdit />{' '}
                          </div>
                          <Link className="p-[6px] text-[#C40C0C]">
                            {' '}
                            <FaTrash />{' '}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>
          </div>
        </div>

        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? 'right-0' : '-right-[340px]'
          } z-[9999] top-0 transition-all duration-500 `}
        >
          <div className="w-full pl-5">
            <div className="bg-[#ffffff] h-screen lg:h-auto px-3 py-2 lg:rounded-md shadow-md text-[#595b5d] ">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#595b5d] font-semibold text-xl mb-4 w-full text-center ">
                  Add Reklam
                </h1>

                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoMdCloseCircle />
                </div>
              </div>

              <form onSubmit={add_reklam}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="title"> Reklam Title</label>
                  <input
                    value={state.title}
                    onChange={(e) => {
                      setState({ ...state, title: e.target.value });
                    }}
                    required
                    className="px-4 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                    type="text"
                    id="title"
                    name="reklam_title"
                    placeholder="Reklam Title"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="description"> Reklam Description</label>
                  <input
                    value={state.description}
                    onChange={(e) => {
                      setState({ ...state, description: e.target.value });
                    }}
                    required
                    className="px-4 py-2 focus:border-[#969494] outline-none bg-[#ffffff] border border-[#bcb9b9] rounded-md text-[#000000]"
                    type="text"
                    id="description"
                    name="reklam_description"
                    placeholder="Reklam Description"
                  />
                </div>

                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt="" />
                    ) : (
                      <>
                        <span>
                          <FaImage />{' '}
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={(e) => imageHandle(imageShow, e.target.files)}
                    // onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div className="mt-4">
                    <button
                      disabled={loader ? true : false}
                      className="bg-[#2A629A] w-full hover:bg-[#313A46]  text-white rounded-md px-7 py-2 mb-3"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        'Add Reklam'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reklam;
