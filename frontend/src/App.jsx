import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch} from 'react-redux';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import Wishlist from './components/dashboard/Wishlist';
import OrderDetails from './components/dashboard/OrderDetails';
import Chat from './components/dashboard/Chat';
import ConfirmOrder from './pages/ConfirmOrder';

// import { useTranslation } from "react-i18next";
// // import i18next from "i18next";
// import cookies from "js-cookie";

// const languages = [
//   {
//     code: "en",
//     name: "English",
//     country_code: "en",
//   },
//   {
//     code: "kr",
//     name: "کوردی",
//     dir: "rtl",
//     country_code: "kr",
//   },
// ];

function App() {
  // const currentLanguageCode = cookies.get("i18next") || "en";
  // const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  // const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);

  // useEffect(() => {
    
  //   document.body.dir = currentLanguage.dir || "ltr";
  //   document.title = t("app_title");
  // }, [currentLanguage, t]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/shops' element={<Shops/>} />
      <Route path='/card' element={<Card/>} />
      <Route path='/shipping' element={<Shipping/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/products?' element={<CategoryShop/>} />
      <Route path='/products/search?' element={<SearchProducts/>} />
      <Route path='/product/details/:slug' element={<Details/>} /> 
      <Route path='/order/confirm?' element={<ConfirmOrder/>} /> 

      <Route path='/dashboard' element={<ProtectUser/>} >
      <Route path='' element={<Dashboard/>} >        
      <Route path='' element={<Index/>} />
      <Route path='my-orders' element={<Orders/>} /> 
      <Route path='change-password' element={<ChangePassword/>} /> 
      <Route path='my-wishlist' element={<Wishlist/>} /> 
      <Route path='order/details/:orderId' element={<OrderDetails/>} /> 
      <Route path='chat' element={<Chat/>} /> 
      <Route path='chat/:sellerId' element={<Chat/>} /> 
       
       </Route> 
      </Route>
      
       




    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
