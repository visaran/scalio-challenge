import { Fragment, FunctionComponent, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import { userService } from "../services/userService";
import { IUserAPIResponse } from "../types/api";
import { APIErrorNotification } from "../utils/notifications";

export const HomePage: FunctionComponent = () => {
  const [data, setData] = useState<IUserAPIResponse>({
    incomplete_results: false,
    items: [],
    total_count: 0,
  });

  const handleSearch = async (searchValue: string) => {
    try {
      const { data } = await userService.searchUsers(searchValue);
      setData(data);
    } catch (err) {
      APIErrorNotification();
    }
  };

  const RenderResults = () => {
    if (!data.items.length) return null;
    return <Results data={data} />;
  };

  return (
    <Fragment>
      <Search onSearch={handleSearch} />
      <RenderResults />
    </Fragment>
  );
};

export default HomePage;
