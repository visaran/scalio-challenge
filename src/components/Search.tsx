import axios from "axios";
import React, { FunctionComponent, useContext, useState } from "react";
import { UsersContext } from "../pages/HomePage";
import { userService } from "../services/userService";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const [login, setLogin] = useState<string>("");

  const { setUsers } = useContext(UsersContext);

  async function onSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!login) return;

    async function fetchData() {
      const { data } = await userService.searchUsers(login);
      setUsers(data.items);
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
