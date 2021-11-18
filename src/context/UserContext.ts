import { createContext } from "react";
import { IUser } from "../entities/User";

interface IUserContext {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export const usersContextDefaultValue: IUserContext = {
  users: [],
  setUsers: () => {},
};

export const UsersContext = createContext<IUserContext>(
  usersContextDefaultValue
);
