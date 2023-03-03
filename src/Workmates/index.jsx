import React, { useContext, useEffect, useState } from "react";
import axios, { api } from "../api/axios_config";
import { ProfileContext } from "../App";

import { WorkmatesItem } from "../components/WorkmatesItem";
export const Workmates = ({setFetch}) => {

  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    axios
      .get(
        "/api/v1/auth/users/?is_staff",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data.results);
      });
  }, []);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  let totalPage = Math.ceil(users.length / limit);
  const {profile,setProfile} = useContext(ProfileContext);
  const handlePageChange = (value) => {
    if (value === "prev") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "next") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else {
      setPage(value);
    }
  };

  useEffect(() => {
    axios.get("/api/v1/auth/profile/",
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data))
        setProfile(res.data)
      })
  },[])

  return (
    <div className="workmates">
      <div className="workmates_main_title">
        Все пользователи, сотрудники, советники
      </div>
      <div className="workmates_inner">
        {
          users?.map((item, i) => (
            <WorkmatesItem item={item} key={i}/>
          ))
        }
      </div>
    </div>
  );
};
