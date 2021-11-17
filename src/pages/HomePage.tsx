import React, { Fragment, FunctionComponent, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import { userService } from "../services/userService";
import { IUserAPIResponse } from "../types/api";
import { APIErrorNotification } from "../utils/notifications";

export const HomePage: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IUserAPIResponse>({
    incomplete_results: false,
    items: [],
    total_count: 0,
  });

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await userService.searchUsers(login, page);
      setData(data);
    } catch (err: any) {
      const { message, documentation_url } = err.response.data;
      APIErrorNotification(message, documentation_url);
    }
  }

  const handlePageChange = (pageNumber: number) => {
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
      <Search
        login={login}
        onChange={handleQueryChange}
        onSearch={handleSearch}
      />
      <RenderResults />
    </Fragment>
  );
};

export default HomePage;
