import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_orders } from '../../store/Reducers/OrderReducer';

const Orders = () => {
  const dispatch = useDispatch();

  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <div className="flex pb-3 justify-between items-center">
          <h2 className="text-lg text-[#5c5a5a] font-medium ">Orders</h2>{' '}
          <span className='px-2'>{totalOrder} Orderss</span>
        </div>
      </div>

      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#5c5a5a] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i} className="text-[#595b5d] text-lg border-b  border-[#dcdada]">
                  <td
                    scope="row"
                    className="py-1 px-4  whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4  whitespace-nowrap"
                  >
                    ${d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 whitespace-nowrap"
                  >
                    {d.payment_status}{' '}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4  whitespace-nowrap"
                  >
                    {d.delivery_status}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 whitespace-nowrap"
                  >
                    {d.date}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4  whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                    <Link
                        to={`/seller/dashboard/order/details/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-[#343b40]"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                      {/* <Link
                        to={`/seller/dashboard/order/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalOrder <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
