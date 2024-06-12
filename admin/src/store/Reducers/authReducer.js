import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.post('/admin-login', info, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.token);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_register = createAsyncThunk(
  'auth/admin_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-register', info, {
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

export const get_admin_users = createAsyncThunk(
  'auth/get_admin_users',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-admin-users?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_admin_user = createAsyncThunk(
  'auth/delete_admin_user',
  async ({ userId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/delete-admin-user/${userId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_update = createAsyncThunk(
  'seller/admin_update',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-update', info, {
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

export const admin_image_upload = createAsyncThunk(
  'auth/admin_image_upload',
  async ({ userId, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('userId', userId);

      const { data } = await api.post(
        `/admin-image-upload/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end method

export const seller_login = createAsyncThunk(
  'auth/seller_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.post('/seller-login', info, {
        withCredentials: true,
      });
      // console.log(data);
      localStorage.setItem('accessToken', data.token);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/get-user', { withCredentials: true });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const profile_info_add = createAsyncThunk(
  'auth/profile_info_add',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/profile-info-add', info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
// end method

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken');
      return '';
    } else {
      return decodeToken.role;
    }
  } else {
    return '';
  }
};

// end Method

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(role, navigate);
      const { data } = await api.get('/logout', { withCredentials: true });
      localStorage.removeItem('accessToken');
      if (role === 'admin') {
        navigate('/admin/login');
      } else {
        navigate('/login');
      }
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// end Method

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    adminUsers: [],
    totalAdmin: 0,
    adminUser: '',
    seller: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken'),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })

      .addCase(admin_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminUser = payload.adminUser;
        state.successMessage = payload.message;
        // state.token = payload.token;
        // state.role = returnRole(payload.token);
      })

      .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })

      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        
      })

      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })

      .addCase(get_admin_users.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminUsers = payload.adminUsers;
        state.totalAdmin = payload.totalAdmin;
      })
      .addCase(get_admin_users.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      .addCase(delete_admin_user.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.adminUsers = payload.adminUsers;
      })

      .addCase(admin_update.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_update.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_update.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminUser = payload.adminUser;
        state.successMessage = payload.message;
        // state.token = payload.token;
        // state.role = returnRole(payload.token);
      })
      .addCase(admin_image_upload.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(admin_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminUser = payload.adminUser;
                state.successMessage = payload.message;
      })

      .addCase(profile_info_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
