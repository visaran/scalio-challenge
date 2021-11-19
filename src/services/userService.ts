import { apiClient } from ".";

interface ISearchUser {
  login: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const userService = {
  searchUsers: ({ login, page = 1, perPage = 9, sort = "" }: ISearchUser) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${perPage}&page=${page}&sort=${sort}`
    ),
};
