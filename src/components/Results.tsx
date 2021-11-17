import React, { FunctionComponent, useState } from "react";
import { Table } from "antd";
import { IUser } from "../types/user";

interface ResultsProps {
  page: number;
  users: IUser[];
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
}

const Results: FunctionComponent<ResultsProps> = ({
  users,
  totalCount,
  onPageChange,
  page,
}) => {
  function onChange(page: number) {
    onPageChange(page);
  }

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
          pageSize: 9,
          total: totalCount,
          onChange: (page) => onChange(page),
          current: page,
        }}
        // loading={{ spinning: !Boolean(data.items.length) }}
        dataSource={users}
      />
    </div>
  );
};

export default Results;
