import { createContext, FunctionComponent, useCallback, useState } from "react";
import Results from "../components/Results";
import Search from "../components/Search";

interface IUser {
  avatar_url: number;
  login: string;
  html_url: string;
  type: string;
}

interface UsersContextData {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export const usersContextDefaultValue: UsersContextData = {
  users: [],
  setUsers: () => {},
};

export const UsersContext = createContext<UsersContextData>(
  usersContextDefaultValue
);

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
