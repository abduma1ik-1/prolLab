import React from "react";
import { WorkmatesItem } from "../../components/WorkmatesItem";

export const Pagination = ({ users, page, limit, setUsers }) => {
  let arr = [];

  for (let i = (page - 1) * limit; i < page * limit; i++) {
    arr.push(users[i]);
  }

  return (
    <div>
      {arr &&
        arr.map((i, index) => (
          <div key={index}>
            <WorkmatesItem item={i} />
          </div>
        ))}
    </div>
  );
};
