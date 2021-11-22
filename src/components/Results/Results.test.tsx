import { getByTestId } from "@testing-library/react";
import React from "react";
import * as reactRedux from "react-redux";
import { render, cleanup } from "../../test-utils";
import Results from "./Results";

afterEach(cleanup);

it("renders nothing if users array is empty", async () => {
  const { container } = render(<Results />);
  expect(container).toBeEmptyDOMElement();
});

// it("renders component if users array is populated", async () => {
//   const spy = jest.spyOn(reactRedux, "useSelector");
//   spy.mockReturnValue({
//     users: [
//       { avatar_url: "https://avatars.githubusercontent.com/u/940133?v=4" },
//       { login: "aaronabramov" },
//       { type: "User" },
//     ],
//   });
//   const { queryByTestId } = render(<Results />);
//   expect(queryByTestId("results-table")).toBeInTheDocument();
// });
