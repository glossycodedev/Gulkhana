import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';

const Shops = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

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
      <div className="w-full pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Shops</h2>
      </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <div className="flex pb-3 justify-between items-center">
          <div className="flex gap-3 items-center">
            <h2 className="text-md text-[#5c5a5a]">Display</h2>
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
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
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  District
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
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                  </td>
                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.name}{' '}
                  </td>
                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.shopInfo?.shopName}
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    <span>{d.payment}</span>{' '}
                  </td>
                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.email}{' '}
                  </td>

                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.status}{' '}
                  </td>

                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.shopInfo?.district}{' '}
                  </td>

                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/seller/details/${d._id}`}
                        className="p-[6px] bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
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
              showItem={4}
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
