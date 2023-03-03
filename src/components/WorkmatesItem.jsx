import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios_config";

import { useForm } from "react-hook-form";

import profile_icon from "../assets/svg/profile/profile_none_icon.svg";
import { Modal } from "./Modal";
import { ProfileContext } from "../App";

export const WorkmatesItem = ({ item }) => {
  const [error, setError] = useState()

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [active, setActive] = useState(false);
  const [point, setPoint] = useState(item?.point_as_staff?.value)
  let currentTime = new Date();
  const {profile,setProfile} = useContext(ProfileContext);
  let month = currentTime.getMonth() + 1;

  let year = currentTime.getFullYear();
  const sendPoint = async (data) => {
   await axios.post("/api/v1/points/", {
      value: data.point,
      month: month,
      year: year,
      head: profile.id,
      staff: item.id,
    })
    .then((res) => {
      setActive(false);
      setPoint(data?.point)
    })
    .catch(error => {
      setError(error.response.data);
    })
    
    await axios.get("/api/v1/auth/profile/",
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data))
      setProfile(res.data)
    })
    
  };
  const editPoint = async (data) => {
    await axios.patch(`/api/v1/points/${item.point_as_staff.id}/`, {
      value: data.edit_point,
    })
    .then((res) => {
      setActive(false);
      setPoint(data?.edit_point)
    })
    .catch(error => {
      setError(error.response.data);
    })

   await axios.get("/api/v1/auth/profile/",
    {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data))
      setProfile(res.data)
    })
  };
  return (
    <div className="workmates_content">
      <div className="workmates_items">
        <div className="workmates_item">
          <img src={item?.avatar ? item?.avatar : profile_icon} alt="" />
        </div>
        <div className="workmates_item">
          <div className="workmates_title">Имя и фамилия:</div>
          {item?.first_name + " " + item?.last_name}
        </div>
    {point ? (
        <div className="workmates_item">
          <div className="workmates_title">Балов:</div>
      
          <div onClick={() => setActive(true)} className="workmates_more">
            {point}
          </div>
          </div>
        ) : (
          <button className="workmates_btn" onClick={() => setActive(true)}>
            Добавить балл
          </button>
        )}
        

        

        <div className="workmates_item">
          <div className="workmates_title">Номер телефона:</div>
          {item?.phone}
        </div>
        <div className="workmates_item">
          <div className="workmates_title">Электронная почта:</div>
          {item?.email}
        </div>
        <div
          className="workmates_more"
          onClick={() => navigate(`user/${item?.id}/`)}
        >
          More...
        </div>
        {/* <div className="workmates_item">
          <div className="workmates_item_btn">
            <button>edit</button>
          </div>
          <div className="workmates_item_btn">
            <button>delete</button>
          </div>
        </div> */}
      </div>

      <Modal
        item={item}
        active={active}
        setActive={setActive}
        content={
          <div>
            {!item?.point_as_staff?.value ? (
              <div className="profile_item">
                <div className="profile_item_title">Баллы:</div>
                <div className="profile_item_input">
                  <input {...register("point")} type="number" />
                  <div className="error_text">{error?.value ? error?.value : ''}</div>
                </div>
                <button
                  className="workmates_btn"
                  onClick={handleSubmit(sendPoint)}
                >
                  ok
                </button>
              </div>
            ) : null}

            {item?.point_as_staff?.value ? (
              <div className="profile_item">
                <div className="profile_item_title">Баллы:</div>
                <div className="profile_item_input">
                  <input
                    {...register("edit_point")}
                    type="number"
                    defaultValue={item?.point_as_staff?.value}
                  />
                  <div className="error_text">{error?.value ? error?.value : ''}</div>
                </div>
                <button
                  className="workmates_btn"
                  onClick={handleSubmit(editPoint)}
                >
                  ok
                </button>
              </div>
            ) : null}
          </div>
        }
      />
    </div>
  );
};
