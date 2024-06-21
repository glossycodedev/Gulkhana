import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const reklamAdd = createAsyncThunk(
  'reklam/reklamAdd',
  async (
    { title, description, image },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);

      const { data } = await api.post('/reklam-add', formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// End Method

// export const get_categoryId = createAsyncThunk(
//   'category/get_categoryId',
//   async (
//     { categoryId, name, image },
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('image', image);
//       const { data } = await api.post(
//         `/categoryId-get/${categoryId}`,
//         formData,
//         { withCredentials: true }
//       );
//       //console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       // console.log(error.response.data)
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// End Method

export const get_reklam = createAsyncThunk(
  'reklam/get_reklam',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/reklam-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const reklamUpdate = createAsyncThunk(
  'reklam/reklamUpdate',
  async (obj, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/reklam-update', obj, {
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

export const reklam_image_update = createAsyncThunk(
  'reklam/reklam_image_update',
  async ({ formData, reklamId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/reklam-image-update/${reklamId}`,
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

export const reklamReducer = createSlice({
  name: 'reklam',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    reklams: [],
    reklam: '',
    totalReklam: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reklamAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(reklamAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(reklamAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.reklams = [...state.reklams, payload.reklam];
      })

      //   .addCase(get_categoryId.fulfilled, (state, { payload }) => {
      //     state.loader = false;
      //     state.successMessage = payload.message;
      //   })

      .addCase(reklamUpdate.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(reklamUpdate.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(reklamUpdate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.reklam = payload.reklam;
        state.successMessage = payload.message;
      })

      .addCase(reklam_image_update.fulfilled, (state, { payload }) => {
        state.reklam = payload.reklam;
        state.successMessage = payload.message;
      })

      .addCase(get_reklam.fulfilled, (state, { payload }) => {
        state.totalReklam = payload.totalReklam;
        state.reklams = payload.reklams;
      });
  },
});
export const { messageClear } = reklamReducer.actions;
export default reklamReducer.reducer;
