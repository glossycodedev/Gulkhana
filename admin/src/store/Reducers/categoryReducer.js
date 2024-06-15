import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

// export const categoryAdd = createAsyncThunk(
//   'category/categoryAdd',
//   async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       console.log('name', name, 'image', image)
//       // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('image', image);
//       const { data } = await api.post('/category-add', formData, {
//         withCredentials: true,
//         // config,
//       });

//       return fulfillWithValue(data);
//     } catch (error) {
//       // console.log(error.response.data)
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const categoryAdd = createAsyncThunk(
  'category/categoryAdd',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);

      const { data } = await api.post('/category-add', formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_categoryId = createAsyncThunk(
  'category/get_categoryId',
  async (
    { categoryId, name, image },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const { data } = await api.post(
        `/categoryId-get/${categoryId}`,
        formData,
        { withCredentials: true }
      );
      //console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

export const get_category = createAsyncThunk(
  'category/get_category',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const categoryUpdate = createAsyncThunk(
  'category/categoryUpdate',
  async (
    { categoryId, name, image },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('categoryId', categoryId);
      formData.append('image', image);
      const { data } = await api.post('/category-update', formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

// export const category_image_update = createAsyncThunk(
//   'category/category_image_update',
//   async (
//     { oldImage, newImage, categoryId },
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append('oldImage', oldImage);
//       formData.append('newImage', newImage);
//       formData.append('categoryId', categoryId);
//       const { data } = await api.post('/category-image-update', formData, {
//         withCredentials: true,
//       });
//       //console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// End Method

export const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categorys: [],
    category: '',
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categorys = [...state.categorys, payload.category];
      })

      .addCase(get_categoryId.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(categoryUpdate.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryUpdate.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryUpdate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.category = payload.category;
        state.successMessage = payload.message;
      })

      // .addCase(category_image_update.fulfilled, (state, { payload }) => {
      //   state.category = payload.category;
      //   // state.successMessage = payload.message;
      // })

      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategory;
        state.categorys = payload.categorys;
      });
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
