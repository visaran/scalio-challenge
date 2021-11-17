import React, { FunctionComponent, useState } from "react";
import { Table } from "antd";
import { IUser } from "../types/user";

interface ResultsProps {
  page: number;
  loading: boolean;
  users: IUser[];
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
}

const Results: FunctionComponent<ResultsProps> = ({
  page,
  loading,
  users,
  totalCount,
  onPageChange,
}) => {
  const columns = [
    { title: "Avatar URL", key: "id", dataIndex: "avatar_url" },
    { title: "Login", key: "id", dataIndex: "login" },
    { title: "Type", key: "id", dataIndex: "type" },
  ];

  return (
    <div>
      <Table
        columns={columns}
        pagination={{
          total: totalCount,
          onChange: onPageChange,
          current: page,
        }}
        loading={{ spinning: loading }}
        dataSource={users}
      />
    </div>
  );
};

export default Results;
