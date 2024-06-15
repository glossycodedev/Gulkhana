import { lazy } from 'react';
import EditShop from '../../views/admin/EditShop';
import AddUser from '../../views/admin/AddUser';
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import('../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));
const AddBanner = lazy(() => import('../../views/admin/AddBanner'));
const Reklam = lazy(() => import('../../views/admin/Reklam'));
const AddSeller = lazy(() => import('../../views/admin/AddSeller'));
const Shops = lazy(() => import('../../views/admin/Shops'));
const PaymentRequest = lazy(() => import('../../views/admin/PaymentRequest'));
const DeactiveSellers = lazy(() => import('../../views/admin/DeactiveSellers'));
const SellerRequest = lazy(() => import('../../views/admin/SellerRequest'));
const SellerDetails = lazy(() => import('../../views/admin/SellerDetails'));
const ChatSeller = lazy(() => import('../../views/admin/ChatSeller'));
const OrderDetails = lazy(() => import('../../views/admin/OrderDetails'));

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/orders',
    element: <Orders />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/add-shop',
    element: <AddSeller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/edit-shop/:sellerId',
    element: <EditShop />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/shops',
    element: <Shops />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/category',
    element: <Category />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/banners',
    element: <AddBanner />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/reklam',
    element: <Reklam />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/payment-request',
    element: <PaymentRequest />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/deactive-sellers',
    element: <DeactiveSellers />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/sellers-request',
    element: <SellerRequest />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/shop/details/:sellerId',
    element: <SellerDetails />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/chat-sellers',
    element: <ChatSeller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/chat-sellers/:sellerId',
    element: <ChatSeller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/order/details/:orderId',
    element: <OrderDetails />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/users',
    element: <AddUser />,
    role: 'admin',
  },
];
