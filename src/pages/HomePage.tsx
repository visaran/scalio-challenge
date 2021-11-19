import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Results from "../components/Results/Results";
import Search from "../components/Search/Search";
import {
  searchSelector,
  searchUsers,
  updateSearchInput,
} from "../components/Search/Search.slice";

export const HomePage: FunctionComponent = () => {
  const [login, setLogin] = useState<string>("");
  const { page } = useSelector(searchSelector);
  const dispatch = useDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSearchInput(login));
    dispatch(searchUsers({ login, page }));
  };

  const RenderResults = () => {
    return <Results />;
  };

  return (
    <Fragment>
      <Search login={login} onChange={handleQueryChange} onSearch={onSearch} />
      <RenderResults />
    </Fragment>
  );
};

export default HomePage;
