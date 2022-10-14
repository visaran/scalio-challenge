import { IUser } from "../../entities/User";
import reducer, { updateSearchInput } from "../SearchUsers/SearchUsers.slice";

const initialState = {
  searchInput: "",
  users: [],
  isLoading: false,
  totalCount: 0,
  page: 1,
};

it("returns the initial state", () => {
  expect(reducer(undefined, {} as IUser)).toEqual(initialState);
});

it("updates searchInput value", () => {
  expect(reducer(initialState, updateSearchInput("vini"))).toEqual({
    ...initialState,
    searchInput: "vini",
  });
});
