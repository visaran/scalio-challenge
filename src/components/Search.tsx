import axios from "axios";
import React, { FunctionComponent, useState } from "react";

interface SearchProps {
  onSearch: (searchValue: string, page?: number) => void;
}

const Search: FunctionComponent<SearchProps> = ({ onSearch }) => {
  const [login, setLogin] = useState<string>("");

  async function onSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(login);
  }

  return (
    <div>
      <form onSubmit={onSubmitLogin}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{login}</div>
    </div>
  );
};

export default Search;
