import { apiClient } from ".";

interface ISearchUser {
  login: string;
  currentPage?: number;
  perPage?: number;
}

export const userService = {
  searchUsers: ({ login, currentPage, perPage }: ISearchUser) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${(perPage = 9)}&page=${currentPage}`
    ),
};
