import { IUser } from "./user";

export interface IUserAPIResponse {
  incomplete_results: boolean;
  items: IUser[];
  total_count: number;
}
