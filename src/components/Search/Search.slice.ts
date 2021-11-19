import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { RootState } from "../../store";
import { IUser } from "../../types/user";
import { openNotification } from "../../utils/notifications";

interface ISearchState {
  searchInput: string;
  users: IUser[];
  posts: any[];
  isLoading: boolean;
  totalCount: number;
  page: number;
  status: string;
}

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async ({
    login,
    page,
    sort,
  }: {
    login: string;
    page?: number;
    sort?: string;
  }) => {
    const response = await userService.searchUsers({
      login,
      page,
      sort,
    });
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    posts: [],
    status: "",
    users: [],
    isLoading: false,
    totalCount: 0,
    page: 1,
  } as ISearchState,
  reducers: {
    updateSearchInput(state, action) {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = [...action.payload.items];
      state.totalCount = action.payload.total_count;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      console.error(action.error);
      openNotification({
        message: "Error",
        description:
          "There was an error on the server. Trained monkeys are working to fix the issue.",
      });
    });
  },
});

export const { updateSearchInput } = searchSlice.actions;

export const searchSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
