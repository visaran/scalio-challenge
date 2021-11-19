import React, { FunctionComponent, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { searchSelector, searchUsers } from "../Search/Search.slice";

interface ResultsProps {}

const Results: FunctionComponent<ResultsProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const columns = [
    { title: "Avatar URL", key: "id", dataIndex: "avatar_url" },
    { title: "Login", key: "id", dataIndex: "login" },
    { title: "Type", key: "id", dataIndex: "type" },
  ];

  const dispatch = useDispatch();
  const { users, totalCount, isLoading, searchInput } =
    useSelector(searchSelector);

  const onPageChange = (page: number) => {
    dispatch(searchUsers({ login: searchInput, page }));
    setCurrentPage(page);
  };

  if (!users.length) return null;
  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          total: totalCount,
          onChange: onPageChange,
          current: currentPage,
        }}
        loading={{ spinning: isLoading }}
        dataSource={users}
      />
    </div>
  );
};

export default Results;
