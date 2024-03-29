import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import Results from "../../components/Results/Results";
import Search from "../../components/Search/Search";
import {
  searchUsers,
  updateSearchInput,
  updatePage,
} from "./SearchUsers.slice";

export const SearchUsers: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const dispatch = useDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePage(1));
    dispatch(updateSearchInput(login));
    dispatch(searchUsers({ login, page: 1 }));
  };

  return (
    <div style={{ maxWidth: 1200, margin: "auto" }}>
      <Search login={login} onChange={handleQueryChange} onSearch={onSearch} />
      <Results />
    </div>
  );
};

export default SearchUsers;
