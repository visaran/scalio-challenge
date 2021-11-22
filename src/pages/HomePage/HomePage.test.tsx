import { render, cleanup, getByTestId, fireEvent } from "../../test-utils";
import { IUser } from "../../types/user";
import reducer, { updateSearchInput } from "./Search.slice";
import { rest } from "msw";
import { setupServer } from "msw/node";
import HomePage from "./HomePage";
import { findByTestId } from "@testing-library/react";
// import { fireEvent, getByTestId } from "@testing-library/dom";

afterEach(cleanup);

export const handlers = [
  rest.get("/search/users in:login", (req, res, ctx) => {
    const query = req.url.searchParams;
    const q = query.get("q");
    const per_page = query.get("per_page");
    const page = query.get("page");
    const sort = query.get("sort");
    return res(
      ctx.json({
        avatar_url: "/avatar.jpg",
        login: "visaran",
        type: "User",
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it("fetches a list of users after clicking the submit button", async () => {
  const { findByTestId, findByText } = render(<HomePage />);
  fireEvent.submit(await findByTestId("search-form"));
  // expect(await findByText("visaran")).toBeInTheDocument();
});
