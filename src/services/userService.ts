import { apiClient } from ".";

export const userService = {
  searchUsers: (login: string, currentPage: number = 1, perPage: number = 9) =>
    apiClient.get(
      `/search/users?q=${login} in:login&per_page=${perPage}&page=${currentPage}`
    ),
};
