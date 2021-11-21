import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import { userService } from "../services/userService";
import { IUserAPIResponse } from "../types/api";
import { APIErrorNotification } from "../utils/notifications";

export const HomePage: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<IUserAPIResponse>({
    incomplete_results: false,
    items: [],
    total_count: 0,
  });

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    searchUsers(login, page);
  }, [page]);

  const searchUsers = async (query: string, pageNum: number) => {
    setLoading(true);
    try {
      const { data } = await userService.searchUsers({
        login: query,
        currentPage: pageNum,
      });
      setData(data);
    } catch (err: any) {
      const { message, documentation_url } = err.response.data;
      APIErrorNotification(message, documentation_url);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    searchUsers(login, page);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const RenderResults = () => {
    if (!data?.items.length) return null;
    return (
      <Results
        page={page}
        loading={loading}
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
