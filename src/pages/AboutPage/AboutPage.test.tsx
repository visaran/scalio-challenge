import React from "react";
import { render, cleanup } from "../../test-utils";
import AboutPage from "./AboutPage";

afterEach(cleanup);

it("renders AboutPage correctly", () => {
  const { getByTestId } = render(<AboutPage />);
  expect(getByTestId("oi")).toHaveTextContent("About Page");
});
