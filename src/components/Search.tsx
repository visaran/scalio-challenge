import axios from "axios";
import React, { FunctionComponent, useContext, useState } from "react";
import { UsersContext } from "../context/UserContext";
import { useFormInput } from "../hooks/useFormInput";
import { userService } from "../services/userService";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const login = useFormInput("");

  const { setUsers } = useContext(UsersContext);

  async function onSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!login) return;

    async function fetchData() {
      const { data } = await userService.searchUsers(login.value);
      setUsers(data.items);
    }
    fetchData();
  }

  return (
    <div>
      <form onSubmit={onSubmitLogin}>
        <input {...login} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
