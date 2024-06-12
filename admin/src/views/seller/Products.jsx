import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  delete_product,
  get_products,
} from '../../store/Reducers/productReducer';
import { LuImageMinus } from 'react-icons/lu';
import { backend_url_img } from '../../api/server';

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(15);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(delete_product({ productId: id }));
    }
  };
  // const handleDeleteProduct = (id) => {
  //   dispatch(delete_product({ productId: id }));
  // };

  return (
    <div className="px-2 lg:px-7 pb-5">
      <div className="w-full pl-3 pb-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
        <div className="flex pb-3 justify-between items-center">
          <h2 className="text-lg text-[#5c5a5a] font-medium">All Products</h2>{' '}
          <span className='px-2'>{totalProduct} Products</span>
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
            <thead className="text-sm text-[#5c5a5a] bg-[#EEF2F7]  uppercase border-b border-[#dcdada]">
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
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((d, i) => (
                <tr
                  key={i}
                  className="text-[#595b5d] text-lg border-b  border-[#dcdada]"
                >
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    <img
                      className="w-[45px] h-[45px]"
                      src={`${backend_url_img}/uploads/${d.images[0]}`}
                      // src={d.images[0]}
                      alt=""
                    />
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    {d?.name?.slice(0, 15)}...
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    {d.category}
                  </td>
                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    {d.brand}{' '}
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    {d.discount === 0 ? (
                      <span>No Discount</span>
                    ) : (
                      <span>%{d.discount}</span>
                    )}
                  </td>

                  <td scope="row" className="py-1 px-4  whitespace-nowrap">
                    {d.stock}
                  </td>

                  <td scope="row" className="py-1 px-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${d._id}`}
                        className="p-[6px] bg-[#2A629A] rounded hover:shadow-lg hover:shadow-[#2a629aab] text-[#e8ebed]"
                      >
                        {' '}
                        <FaEdit />{' '}
                      </Link>

                      {/* <Link to={`/seller/dashboard/add-banner/${d._id}`} className='p-[6px] bg-sky-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'> <LuImageMinus /> </Link>  */}

                      {/* <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'> <FaEye/> </Link> */}
                      <div
                        onClick={() => handleDeleteProduct(d._id)}
                        className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 text-[#e8ebed]"
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

        {totalProduct <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
