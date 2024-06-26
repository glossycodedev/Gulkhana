import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';
import { backend_url_img } from '../../api/server';

const Shops = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);
  // const [show, setShow] = useState(false);

  const { sellers, totalSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <div className="flex pb-3 justify-between items-center">
          <h2 className="text-lg text-[#5c5a5a] font-medium">Shops</h2>{' '}
          <span className="px-2">{totalSeller} Sellers</span>
        </div>
      </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <div className="flex pb-3 justify-between items-center">
          <div className="flex gap-3 items-center">
            <h2 className="text-md text-[#5c5a5a]">Display</h2>
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
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

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6] ">
            <thead className="text-sm text-[#5c5a5a] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Seller Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Phone
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  City
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {sellers.map((d, i) => (
                <tr
                  key={i}
                  className="text-[#595b5d] text-lg border-b  border-[#dcdada]"
                >
                  <td className="py-2 px-4  whitespace-nowrap">{i + 1}</td>
                  <td className="py-2 px-4  whitespace-nowrap">
                    <img
                      className="w-[50px] h-[50px]"
                      src={`${backend_url_img}/uploads/${d.image}`}
                      alt=""
                    />
                  </td>
                  <td className="py-1 px-4 whitespace-nowrap">{d.name} </td>
                  <td className="py-1 px-4 whitespace-nowrap">
                    {d.shopInfo?.shopName}
                  </td>
                  <td className="py-1 px-4  whitespace-nowrap">
                    <span>{d.category}</span>{' '}
                  </td>
                  <td className="py-1 px-4 whitespace-nowrap">{d.phone} </td>

                  <td className="py-1 px-4 whitespace-nowrap">{d.status} </td>

                  <td className="py-1 px-4 whitespace-nowrap">
                    {d.shopInfo?.city}{' '}
                  </td>

                  <td className="py-1 px-4  whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/edit-shop/${d._id}`}
                        className="p-[6px] bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                      >
                        {' '}
                        <FaEdit />{' '}
                      </Link>
                      <Link
                        to={`/admin/dashboard/shop/details/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-[#343b40]"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalSeller <= parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              parPage={parPage}
              showItem={5}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Shops;
