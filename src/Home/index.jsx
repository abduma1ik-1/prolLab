import React, { useContext, useEffect, useState } from "react";
import CircleDiogram from "../Diograms/CircleDioram";
import { Diogram } from "../Diograms/Digram";
import { Vdiogram } from "../Diograms/Vdiogram";
import axios from "../api/axios_config";
import { ProfileContext } from "../App";

export const Home = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const [ points, setPoints ] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/auth/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data));
        setProfile(res.data);
      });

      axios
      .get(`/api/v1/points/?staff=${profile?.id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPoints(res.data.results);
      });
  }, []);
  console.log(points);
  {
    /* <Vdiogram/> */
  }
  return (
    <div className="home">
      <div className="home_inner">
        <div className="home_diogram"><Diogram points={points} /></div>
        <div className="home_diogram"><CircleDiogram /></div>
      </div>
    </div>
  );
};
