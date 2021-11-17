import { apiClient } from ".";

export const userService = {
  searchUsers: (login: string, perPage: number = 9, currentPage: number = 1) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${perPage}&page=${currentPage}`
    ),
};
