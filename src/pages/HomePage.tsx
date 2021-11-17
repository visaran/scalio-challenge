import { Fragment, FunctionComponent, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import { userService } from "../services/userService";
import { IUserAPIResponse } from "../types/api";
import { APIErrorNotification } from "../utils/notifications";

export const HomePage: FunctionComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IUserAPIResponse>({
    incomplete_results: false,
    items: [],
    total_count: 0,
  });

  const handleSearch = async (searchValue: string, page: number = 0) => {
    try {
      setQuery(searchValue);
      const { data } = await userService.searchUsers(searchValue, page);
      setData(data);
    } catch (err: any) {
      const { message, documentation_url } = err.response.data;
      APIErrorNotification(message, documentation_url);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    handleSearch(query, pageNumber);
    setPage(pageNumber);
  };

  const RenderResults = () => {
    if (!data?.items.length) return null;
    return (
      <Results
        page={page}
        onPageChange={handlePageChange}
        users={data.items}
        totalCount={data["total_count"]}
      />
    );
  };

  return (
    <Fragment>
      <Search onSearch={handleSearch} />
      <RenderResults />
    </Fragment>
  );
};

export default HomePage;
