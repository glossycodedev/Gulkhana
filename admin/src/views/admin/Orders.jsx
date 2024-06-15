import React, { useEffect, useState } from 'react';
import { LuArrowDownSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders, get_admin_orders_status } from '../../store/Reducers/OrderReducer';
import { FaEye } from 'react-icons/fa';

const Orders = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);
  const [show, setShow] = useState(false);
  const [state, setState] = useState('all')

  const { myOrders, totalOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_admin_orders_status({status:state}))
},[state])

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="flex pb-3 justify-between items-center">
          <h2 className="text-lg text-[#5c5a5a] font-medium ">Orders</h2>{' '}
          <span className='px-2'>{totalOrder} Orderss</span>
        </div>
      <div className="w-full p-4 bg-[#ffffff] shadow-md rounded-md">
        <div className="flex pb-3 justify-between items-center">
          <div className="flex gap-3 items-center">
            <h2 className="text-md text-[#5c5a5a]">Display</h2>

            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
            >
              <option className="px-4" value="15">
                15
              </option>
              <option className="px-4" value="30">
                30
              </option>
              <option className="px-4" value="60">
                60
              </option>
              <option className="px-4" value="100">
                100
              </option>
            </select>
          </div>
          <div className="flex items-center">
          <div className='flex gap-4 justify-between items-center'>
                <h2 className='text-md text-[#5c5a5a]'>Search </h2>
                <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)} >
                    <option value="all">--All Orders--</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select> 
            </div>
            {/* <h2 className="text-md text-[#5c5a5a] ">Search</h2> */}
            {/* <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className="px-4 py-1 focus:border-[#bcb9b9] outline-none bg-[#F9FBFE] border border-[#bcb9b9] rounded-md text-[#5c5a5a]"
              type="text"
              placeholder="search"
            /> */}
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <thead className="text-sm text-[#5c5a5a] bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                Order id
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
                Order Date
                </th>
                <th scope="col" className="py-3 px-4">
                Action
                </th>
                
              </tr>
            </thead>

            <tbody>
            {myOrders.map((o, i) =>
                <tr key={i} className="text-[#595b5d] py-2 text-lg border-b border-[#dcdada]">
                  <td
                    scope="row"
                    className="py-2 px-4  whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4  whitespace-nowrap"
                  >
                    #{o._id}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4  whitespace-nowrap"
                  >
                    ${o.price}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 whitespace-nowrap"
                  >
                    {o.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 whitespace-nowrap"
                  >
                   {o.delivery_status}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 whitespace-nowrap"
                  >
                   {o.date}
                  </td>

                  <td
                    scope="row"
                    className="py-2 px-4  whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                    <Link to={`/admin/dashboard/order/details/${o._id}`} 
                     className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-[#343b40]"
                        // className="p-[6px] bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                      >
                        {' '}
                        <FaEye />{' '}
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left ">
            <div className="text-sm text-[#5c5a5a] px-2 bg-[#EEF2F7] uppercase border-b border-[#dcdada]">
              <div className=" flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold">Order id</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action </div>
                <div className="py-3 w-[8%] font-bold">
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>

            {myOrders.map((o, i) => (
              <div key={i} className="text-[#595b5d] ">
                <div className=" flex justify-between text-lg items-start border-b border-[#dcdada]">
                  <div className="py-3 w-[25%]  whitespace-nowrap">
                    #{o._id}
                  </div>
                  <div className="py-3 w-[13%] ">${o.price}</div>
                  <div className="py-3 w-[18%]">{o.payment_status}</div>
                  <div className="py-3 w-[18%] ">{o.delivery_status}</div>
                  <div className="py-4 w-[18%] ">
                    <Link to={`/admin/dashboard/order/details/${o._id}`} 
                    className=" bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]">
                      <FaEye />
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(o._id)}
                    className="py-3 w-[8%] font-medium"
                  >
                    <LuArrowDownSquare />
                  </div>
                </div>

                <div
                  className={
                    show === o._id
                      ? 'block border-b border-[#b9bcbe] bg-[#F9FBFE]'
                      : 'hidden'
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div key={i} className=" flex justify-start items-start ">
                      <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                        #{so._id}
                      </div>
                      <div className="py-3 w-[13%] font-medium">
                        ${so.price}
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {so.payment_status}
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {so.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {totalOrder <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
