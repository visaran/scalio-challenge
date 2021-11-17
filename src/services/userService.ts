import { apiClient } from ".";

interface ISearchUser {
  login: string;
  currentPage?: number;
  perPage?: number;
}

export const userService = {
  searchUsers: ({ login, currentPage, perPage = 9 }: ISearchUser) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${perPage}&page=${currentPage}`
    ),
};
