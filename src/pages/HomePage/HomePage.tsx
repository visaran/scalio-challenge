import { Fragment } from "react";
import SearchUsers from "../../components/SearchUsers/SearchUsers";

export const HomePage = () => {
  return (
    <Fragment>
      <h1 style={{ textAlign: "center" }}>Scalio Challenge</h1>
      <SearchUsers />
    </Fragment>
  );
};

export default HomePage;
