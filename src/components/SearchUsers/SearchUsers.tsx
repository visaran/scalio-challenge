import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "../../components/Results/Results";
import Search from "../../components/Search/Search";
import {
  searchUsers,
  updateSearchInput,
} from "../../components/Search/Search.slice";

export const SearchUsers: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const dispatch = useDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSearchInput(login));
    dispatch(searchUsers({ login, page: 1 }));
  };

  return (
    <Fragment>
      <Search login={login} onChange={handleQueryChange} onSearch={onSearch} />
      <Results />
    </Fragment>
  );
};

export default SearchUsers;
