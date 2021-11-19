import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { RootState } from "../../store";
import { IUser } from "../../types/user";
import { APIErrorNotification } from "../../utils/notifications";

interface ISearchState {
  searchInput: string;
  users: IUser[];
  isLoading: boolean;
  totalCount: number;
  page: number;
}

const initialState: ISearchState = {
  searchInput: "",
  users: [],
  isLoading: false,
  totalCount: 0,
  page: 1,
};

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({ login, page }: { login: string; page: number }) => {
    try {
      const response = await userService.searchUsers({
        login,
        page,
      });
      return response.data;
    } finally {
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    // updatePage(state, action) {
    //   state.page = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.totalCount = action.payload.total_count;
      state.isLoading = false;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.users = [];
      console.log(action.error.name);
      APIErrorNotification(action.error.name!, action.error.message!);
    });
  },
});

export const { updateSearchInput } = searchSlice.actions;

export const searchSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
