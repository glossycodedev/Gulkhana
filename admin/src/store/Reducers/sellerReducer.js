import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_seller_request = createAsyncThunk(
  'seller/get_seller_request',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      //  console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_seller = createAsyncThunk(
  'seller/get_seller',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      //  console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
// end method

export const seller_register = createAsyncThunk(
  'seller/seller_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post('/seller-register', info, {
        withCredentials: true,
      });
      // localStorage.setItem('accessToken', data.token);
      //  console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method
export const seller_update = createAsyncThunk(
  'seller/seller_update',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post('/seller-update', info, {
        withCredentials: true,
      });
      // localStorage.setItem('accessToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// end method

export const profile_image_upload = createAsyncThunk(
    'seller/profile_image_upload',
    async ({ sellerId, image }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('sellerId', sellerId);
  
        const { data } = await api.post(`/profile-image-upload/${sellerId}`, formData, {
          withCredentials: true,
        });
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
// end method

export const seller_status_update = createAsyncThunk(
  'seller/seller_status_update',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });
      //  console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_active_sellers = createAsyncThunk(
  'seller/get_active_sellers',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_deactive_sellers = createAsyncThunk(
  'seller/get_deactive_sellers',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const create_stripe_connect_account = createAsyncThunk(
  'seller/create_stripe_connect_account',
  async () => {
    try {
      const {
        data: { url },
      } = await api.get(`/payment/create-stripe-connect-account`, {
        withCredentials: true,
      });
      window.location.href = url;
    } catch (error) {
      // console.log(error.response.data)
    }
  }
);

// End Method

export const active_stripe_connect_account = createAsyncThunk(
  'seller/active_stripe_connect_account',
  async (activeCode, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/payment/active-stripe-connect-account/${activeCode}`,
        {},
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const sellerReducer = createSlice({
  name: 'seller',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    totalSeller: 0,
    userInfo: '',
    seller: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })

      .addCase(seller_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.seller = payload.seller;
        state.successMessage = payload.message;
        // state.token = payload.token;
        // state.role = returnRole(payload.token);
      })

      .addCase(seller_update.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_update.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_update.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.seller = payload.seller;
        state.successMessage = payload.message;
        // state.token = payload.token;
        // state.role = returnRole(payload.token);
      })

      .addCase(profile_image_upload.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.seller = payload.seller;
        // state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })

      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })

      .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(
        active_stripe_connect_account.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.successMessage = payload.message;
        }
      );
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
