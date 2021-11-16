import { FunctionComponent } from "react";
import Results from "../components/Results";
import Search from "../components/Search";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div>
      <Search />
      <Results />
    </div>
  );
};

export default HomePage;
