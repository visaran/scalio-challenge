import { render, cleanup, getByTestId } from "../../test-utils";
import { IUser } from "../../types/user";
import reducer, { updatePage, updateSearchInput } from "./SearchUsers.slice";
import { rest } from "msw";
import { setupServer } from "msw/node";
import SearchUsers from "./SearchUsers";
import { findByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import axios from "axios";

// workaround to remove window.matchMedia error:
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

export const handlers = [
  rest.get("https://api.github.com/search/users", (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            id: 1,
            login: "vinifraga",
            type: "User",
            avatar_url: "http://test.it",
          },
        ],
      }),
      ctx.delay(150)
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const initialState = {
  searchInput: "",
  users: [],
  isLoading: false,
  totalCount: 0,
  page: 1,
};

it("fetches a list of users after hitting submit", async () => {
  const { findByTestId, findByText } = render(<SearchUsers />);
  userEvent.type(await findByTestId("search-input"), "vini");
  fireEvent.click(await findByTestId("search-submit"));
  expect(await findByText("vinifraga")).toBeInTheDocument();
});

it("returns the initial state", () => {
  expect(reducer(undefined, {} as IUser)).toEqual(initialState);
});

it("updates searchInput value", () => {
  expect(reducer(initialState, updateSearchInput("vini"))).toEqual({
    ...initialState,
    searchInput: "vini",
  });
});

it("updates page value", () => {
  expect(reducer(initialState, updatePage(2))).toEqual({
    ...initialState,
    page: 2,
  });
});
