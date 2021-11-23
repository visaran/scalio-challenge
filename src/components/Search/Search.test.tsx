import { render, cleanup, getByTestId, fireEvent } from "../../test-utils";
import { IUser } from "../../types/user";
import reducer, { updateSearchInput } from "../SearchUsers/SearchUsers.slice";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Search from "./Search";
import { findByTestId } from "@testing-library/react";
// import { fireEvent, getByTestId } from "@testing-library/dom";

afterEach(cleanup);

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
