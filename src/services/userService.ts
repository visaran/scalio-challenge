import { apiClient } from ".";

interface ISearchUser {
  login: string;
  page?: number;
  perPage?: number;
}

export const userService = {
  searchUsers: ({ login, page, perPage = 9 }: ISearchUser) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${perPage}&page=${page}`
    ),
};
