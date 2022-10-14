import React, { FunctionComponent, useRef } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import {
  searchUsers,
  searchUsersSelector,
  updatePage,
} from "../SearchUsers/SearchUsers.slice";
import { ColumnsType } from "antd/lib/table";
import { IUser } from "../../entities/User";
import { useAppDispatch } from "../../store";

interface ResultsProps {}

const Results: FunctionComponent<ResultsProps> = () => {
  const maxResults = useRef(1000);
  const columns: ColumnsType<IUser> = [
    {
      title: "Avatar URL",
      defaultSortOrder: "descend",
      sorter: (a: any, b) => a.avatar_url.localeCompare(b.avatar_url),
      dataIndex: "avatar_url",
    },
    {
      title: "Login",
      sorter: (a, b) => a.login.localeCompare(b.login),
      dataIndex: "login",
    },
    {
      title: "Type",
      sorter: (a, b) => a.login.localeCompare(b.login),
      dataIndex: "type",
    },
  ];

  const dispatch = useAppDispatch();
  const {
    users,
    totalCount,
    isLoading,
    searchInput,
    page: currentPage,
  } = useSelector(searchUsersSelector);

  const onPageChange = async (page: number) => {
    dispatch(updatePage(page));
    dispatch(
      searchUsers({
        login: searchInput,
        page,
      })
    );
  };

  if (!users.length) return null;
  return (
    <div>
      <Table<IUser>
        data-testid="results-table"
        rowKey="id"
        rowSelection={{ preserveSelectedRowKeys: false }}
        columns={columns}
        pagination={{
          total:
            totalCount < maxResults.current ? totalCount : maxResults.current,
          current: currentPage,
          pageSize: 9,
          onChange: onPageChange,
          hideOnSinglePage: true,
        }}
        loading={{ spinning: isLoading }}
        dataSource={users}
      />
    </div>
  );
};

export default Results;
