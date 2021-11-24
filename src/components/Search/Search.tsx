import { Button, Input } from "antd";
import React, { FunctionComponent } from "react";

interface SearchProps {
  login: string;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  login,
  onChange,
  onSearch,
}) => {
  return (
    <div>
      <form data-testid="search-form" onSubmit={onSearch}>
        <div style={{ display: "flex" }}>
          <Input
            data-testid="search-input"
            type="text"
            value={login}
            onChange={onChange}
            placeholder="Search for Github users"
          />
          <Button type="primary" data-testid="search-submit" htmlType="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
