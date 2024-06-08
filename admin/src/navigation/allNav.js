import { AiOutlineDashboard, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaImages, FaUserTimes, FaUsers } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { FaCodePullRequest } from 'react-icons/fa6';
import { IoIosChatbubbles } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import { MdViewList } from 'react-icons/md';
import { TbBasketDiscount } from 'react-icons/tb';
import { BsCartCheck } from 'react-icons/bs';
import { CiShop } from 'react-icons/ci';
import { IoChatbubbles } from 'react-icons/io5';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

export const allNav = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    role: 'admin',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Category',
    icon: <BiCategory />,
    role: 'admin',
    path: '/admin/dashboard/category',
  },
  {
    id: 3,
    title: 'Add Shop',
    icon: <CiShop />,
    role: 'admin',
    path: '/admin/dashboard/add-shop',
  },
  {
    id: 4,
    title: 'Shops',
    icon: <CiShop />,
    role: 'admin',
    path: '/admin/dashboard/shops',
  },
  {
    id: 5,
    title: 'Orders',
    icon: <AiOutlineShoppingCart />,
    role: 'admin',
    path: '/admin/dashboard/orders',
  },

  {
    id: 6,
    title: 'Banners',
    icon: <FaImages />,
    role: 'admin',
    path: '/admin/dashboard/banners',
  },
  // {
  //   id: 6,
  //   title: 'Payment Request',
  //   icon: <MdPayment />,
  //   role: 'admin',
  //   path: '/admin/dashboard/payment-request',
  // },
  {
    id: 7,
    title: 'Deactive Sellers',
    icon: <FaUserTimes />,
    role: 'admin',
    path: '/admin/dashboard/deactive-sellers',
  },
  {
    id: 8,
    title: 'Seller Request',
    icon: <FaCodePullRequest />,
    role: 'admin',
    path: '/admin/dashboard/sellers-request',
  },
  {
    id: 9,
    title: 'Live Chat',
    icon: <IoIosChatbubbles />,
    role: 'admin',
    path: '/admin/dashboard/chat-sellers',
  },
  {
    id: 10,
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    role: 'seller',
    path: '/seller/dashboard',
  },
  {
    id: 11,
    title: 'Add Product',
    icon: <IoMdAdd />,
    role: 'seller',
    path: '/seller/dashboard/add-product',
  },
  {
    id: 12,
    title: 'All Product',
    icon: <MdViewList />,
    role: 'seller',
    path: '/seller/dashboard/products',
  },
  {
    id: 13,
    title: 'Discount Product',
    icon: <TbBasketDiscount />,
    role: 'seller',
    path: '/seller/dashboard/discount-product',
  },
  {
    id: 14,
    title: 'Orders',
    icon: <BsCartCheck />,
    role: 'seller',
    path: '/seller/dashboard/orders',
  },
  {
    id: 15,
    title: 'Payments',
    icon: <MdPayment />,
    role: 'seller',
    path: '/seller/dashboard/payments',
  },
  {
    id: 16,
    title: 'Chat-Customer',
    icon: <IoChatbubbles />,
    role: 'seller',
    path: '/seller/dashboard/chat-customer',
  },
  {
    id: 17,
    title: 'Chat-Support',
    icon: <BsFillChatQuoteFill />,
    role: 'seller',
    path: '/seller/dashboard/chat-support',
  },
  {
    id: 18,
    title: 'Profile',
    icon: <CgProfile />,
    role: 'seller',
    path: '/seller/dashboard/profile',
  },
];
