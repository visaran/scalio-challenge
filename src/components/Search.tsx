import axios from "axios";
import React, { FunctionComponent, useState } from "react";

interface SearchProps {
  login: string;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  login,
  onChange,
  onSearch,
}) => {
  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={login} onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <div>{login}</div>
    </div>
  );
};

export default Search;
