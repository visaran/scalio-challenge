import axios from "axios";
import React, { FunctionComponent, useState } from "react";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const [login, setLogin] = useState("");
  const [data, setData] = useState([]);

  async function onSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!login) return;

    async function fetchData() {
      const { data } = await axios(
        `https://api.github.com/search/users?q=${login} in:login`
      );
      setData(data);
    }
    fetchData();
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
