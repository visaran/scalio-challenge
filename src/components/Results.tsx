import React, { FunctionComponent, useContext, useState } from "react";
import { Table } from "antd";
import { UsersContext } from "../context/UserContext";

interface ResultsProps {}

const Results: FunctionComponent<ResultsProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { users } = useContext(UsersContext);

  console.log("users", users);

  function onChange() {
    setCurrentPage(currentPage + 1);
    console.log("currentPage", currentPage);
  }

  const columns = [
    { title: "Avatar URL", key: "id", dataIndex: "avatar_url" },
    { title: "Login", key: "id", dataIndex: "login" },
    { title: "Type", key: "id", dataIndex: "type" },
  ];
  return (
    <div>
      {users && users.length ? (
        <Table
          columns={columns}
          pagination={{
            pageSize: 9,
            total: 100,
            onChange: () => onChange(),
            current: currentPage,
          }}
          loading={{ spinning: !Boolean(users.length) }}
          dataSource={users}
        />
      ) : null}
    </div>
  );
};

export default Results;
