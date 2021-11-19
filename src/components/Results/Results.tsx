import React, { FunctionComponent, useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { searchSelector, searchUsers } from "../Search/Search.slice";
import { ColumnsType } from "antd/lib/table";
import { IUser } from "../../types/user";
import { useAppDispatch } from "../../store";

interface ResultsProps {}

const Results: FunctionComponent<ResultsProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const columns: ColumnsType<IUser> = [
    {
      title: "Avatar URL",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.avatar_url.localeCompare(b.avatar_url),
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
  const { users, totalCount, isLoading, status, searchInput } =
    useSelector(searchSelector);

  useEffect(() => {
    console.log("montou");
    return () => {
      console.log("desmontou");
    };
  }, []);

  const onPageChange = async (page: number) => {
    dispatch(
      searchUsers({
        login: searchInput,
        page,
      })
    );
    setCurrentPage(page);
  };

  if (!users.length) return null;
  return (
    <div>
      {status}
      <Table<IUser>
        rowKey="id"
        rowSelection={{ preserveSelectedRowKeys: false }}
        columns={columns}
        pagination={{
          total: totalCount,
          current: currentPage,
          pageSize: 9,
          onChange: onPageChange,
          hideOnSinglePage: true,
        }}
        // onChange={onTableChange}
        loading={{ spinning: isLoading }}
        dataSource={users}
      />
    </div>
  );
};

export default Results;
