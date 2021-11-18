import { createContext } from "react";
import { IUser } from "../entities/User";

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
