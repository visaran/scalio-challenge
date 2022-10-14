import { render, cleanup } from "../../test-utils";
import Results from "./Results";

afterEach(cleanup);

it("renders nothing if users array is empty", async () => {
  const { container } = render(<Results />);
  expect(container).toBeEmptyDOMElement();
});
