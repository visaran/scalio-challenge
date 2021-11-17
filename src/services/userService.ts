import { apiClient } from ".";

interface ISearchUser {
  login: string;
  currentPage?: number;
  perPage?: number;
}

export const userService = {
  searchUsers: (params: ISearchUser) =>
    apiClient.get(
      `/search/users?q=${
        params.login
      } in:login&per_page=${(params.perPage = 9)}&page=${params.currentPage}`
    ),
};
