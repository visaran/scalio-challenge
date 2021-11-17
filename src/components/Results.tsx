import React, { FunctionComponent, useContext, useState } from "react";
import { Table } from "antd";
import { IUserAPIResponse } from "../types/api";

interface ResultsProps {
  data: IUserAPIResponse;
}

const Results: FunctionComponent<ResultsProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  function onChange(page: number) {
    setCurrentPage(page);
    console.log("currentPage", currentPage);
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
          total: data["total_count"],
          onChange: (page) => onChange(page),
          current: currentPage,
        }}
        // loading={{ spinning: !Boolean(data.items.length) }}
        dataSource={data.items}
      />
    </div>
  );
};

export default Results;
