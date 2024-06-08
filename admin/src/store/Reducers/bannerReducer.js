import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_banner = createAsyncThunk(
  'banner/add_banner',
  async ({ image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      // formData.append('bannerName', bannerName);
      formData.append('image', image);
      const { data } = await api.post(`/banner/add`, formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method
export const get_banners = createAsyncThunk(
  'banner/get_banners',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/banners`, { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_banner = createAsyncThunk(
  'banner/get_banner',
  async ({ rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/banners`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const update_banner = createAsyncThunk(
  'banner/update_banner',
  async ({ image, bannerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      // formData.append('bannerName', bannerName);
      formData.append('image', image);
      formData.append('bannerId', bannerId);
      const { data } = await api.put(`/banner/update/${bannerId}`, formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const delete_banner = createAsyncThunk(
  'banner/delete_banner',
  async ({bannerId}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/banner/delete/${bannerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bannerReducer = createSlice({
  name: 'banner',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    banners: [],
    banner: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(add_banner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })

      .addCase(delete_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })

      //   .addCase(get_banner.fulfilled, (state, { payload }) => {
      //     state.banner = payload.banner;
      //   })
      .addCase(get_banners.fulfilled, (state, { payload }) => {
        state.banners = payload.banners;
      })

      .addCase(update_banner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      });
  },
});
export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
