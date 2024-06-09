import React, { useEffect, useState } from 'react';
import { MdCurrencyExchange, MdProductionQuantityLimits } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaCartShopping, FaEye } from 'react-icons/fa6';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import seller from '../../assets/seller.png';
import { get_admin_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment';
import { get_admin_orders } from '../../store/Reducers/OrderReducer';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);
  const [show, setShow] = useState(false);

  const { myOrders} = useSelector((state) => state.order);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [searchValue, currentPage, parPage]);

  useEffect(() => {
    dispatch(get_admin_dashboard_data());
  }, []);

  const state = {
    series: [
      {
        name: 'Orders',
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: 'Revenue',
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: 'Sellers',
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      color: ['#181ee8', '#181ee8'],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6',
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apl',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apl',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <h2 className="text-lg text-[#5c5a5a] font-medium">Dashboard</h2>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#FFFFFF] shadow-md rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">${totalSale}</h2>
            <span className="text-md font-medium">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-md bg-[#DCDEFC] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#727CF4] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#FFFFFF] shadow-md rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Products</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-md bg-[#DCDEFC] flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-[#727CF4] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#FFFFFF] shadow-md rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalSeller}</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-md bg-[#DCDEFC] flex justify-center items-center text-xl">
            <FaUsers className="text-[#727CF4] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#FFFFFF] shadow-md rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-md bg-[#DCDEFC] flex justify-center items-center text-xl">
            <FaCartShopping className="text-[#727CF4] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#ffffff] p-4 shadow-sm rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12  lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#FFFFFF] h-5/6 p-4 rounded-md shadow-sm text-[#6C757D]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#6C757D] pb-3">
                Recent Seller Message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>

            <div className="flex flex-col h-5/6 overflow-y-scroll gap-2 p-3 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li key={i} className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#313A46] rounded-full z-10">
                      {m.senderId === userInfo._id ? (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={userInfo.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={seller}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {' '}
                          {moment(m.createdAt).startOf('hour').fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4  bg-[#ffffff] shadow-sm rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#6C757D] pb-3 ">
            Recent Orders
          </h2>
          {/* <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link> */}
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
          <div className="flex gap-3 items-center">
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
        </div>

        <div className="relative  overflow-x-auto">
          <table className="w-full text-sm text-left  text-[#d0d2d6]  ">
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
                  Active
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, i) => (
                <tr
                  key={i}
                  className="text-[#595b5d] text-lg border-b  border-[#dcdada]"
                >
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    {d.payment_status}
                  </td>
                  <td scope="row" className="py-2 px-4 whitespace-nowrap">
                    {d.delivery_status}
                  </td>
                  <td scope="row" className="py-2 px-4  whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/order/details/${d._id}`}
                        className="p-[6px] bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                      >
                        <FaEye />
                      </Link>{' '}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
