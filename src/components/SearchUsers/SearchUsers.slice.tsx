import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userService } from "../../services/userService";
import { RootState } from "../../store";
import { IUser } from "../../types/user";
import { openNotification } from "../../utils/notifications";

export interface ISearchState {
  searchInput: string;
  users: IUser[];
  isLoading: boolean;
  totalCount: number;
  page: number;
}

interface ISearchFulfilled {
  loading: boolean;
  items: IUser[];
  total_count: number;
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
    users: [],
    isLoading: false,
    totalCount: 0,
    page: 1,
  } as ISearchState,
  reducers: {
    updateSearchInput: (state: ISearchState, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    updatePage: (state: ISearchState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(searchUsers.pending, (state: ISearchState) => {
      state.isLoading = true;
    });
    builder.addCase(
      searchUsers.fulfilled,
      (state: ISearchState, action: PayloadAction<ISearchFulfilled>) => {
        state.isLoading = false;
        state.users = [...action.payload.items];
        state.totalCount = action.payload.total_count;
      }
    );
    builder.addCase(
      searchUsers.rejected,
      (state: ISearchState, action: any) => {
        state.isLoading = false;
        console.error(action.error);
        openNotification({
          message: "Error",
          description:
            "There was an error on the server. Trained monkeys are working to fix the issue.",
        });
      }
    );
  },
});

export const { updateSearchInput, updatePage } = searchSlice.actions;

export const searchUsersSelector = (state: RootState) => state.search;

export default searchSlice.reducer;
