import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_product = createAsyncThunk(
  'product/add_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-add', product, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_products = createAsyncThunk(
  'product/get_products',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const products_discount_get = createAsyncThunk(
  'product/products_discount_get',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/discount-products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_product = createAsyncThunk(
  'product/get_product',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const update_product = createAsyncThunk(
  'product/update_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/product-update', product, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const product_image_update = createAsyncThunk(
  'product/product_image_update',
  async ({ formData, productId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/product-image-update/${productId}`,
        formData,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method
export const delete_product = createAsyncThunk(
  'product/delete_product',
  async ({ productId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/delete-product/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.error('Delete product error:', error.response.data); // Log the error response
      return rejectWithValue(error.response.data);
    }
  }
);
// export const delete_product = createAsyncThunk(
//     'product/delete_product',
//     async ({ productId }, { rejectWithValue, fulfillWithValue }) => {
//       try {
//         console.log(productId)
//         const { data } = await api.post(`/delete-product/${productId}`, {
//           withCredentials: true,
//         });
//         return fulfillWithValue(data);
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
//   );

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    product: '',
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      })
      .addCase(products_discount_get.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      })

      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })

      .addCase(update_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })

      .addCase(product_image_update.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(delete_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = payload.products;
      });
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
