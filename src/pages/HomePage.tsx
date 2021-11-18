import { createContext, FunctionComponent, useCallback, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";
import { UsersContext, usersContextDefaultValue } from "../context/UserContext";
import { IUser } from "../entities/User";

export const HomePage: FunctionComponent = () => {
  const [users, setUsers] = useState<IUser[]>(usersContextDefaultValue.users);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <Search />
      <Results />
    </UsersContext.Provider>
  );
};

export default HomePage;
