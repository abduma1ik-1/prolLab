import axios, { api } from "../api/axios_config";
import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import profile_none_icon from "../assets/svg/profile/profile_none_icon.svg";
import profile_change_icon from "../assets/svg/profile/profile_change_icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../App";

export const Profile = ({
  preview,
  setPreview,
  setName,
}) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const {setProfile} = useContext(ProfileContext);
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
  const [error, setError] = useState();

  const [editable, setEditable] = useState(false);
  const [active, setActive] = useState(false);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate()
  const onSubmit = async (data) => {
    setName(data.first_name +" "+ data.last_name)
    await axios
      .patch(
        "/api/v1/auth/profile/",
        {
          avatar: data2,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          email: data.email,
          group: data.group,
          password: data.password,
          role: data.role,
          code: data.code,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => 
      localStorage.setItem("profile", JSON.stringify(res.data)),
      
      
      )
      .then((res) => {
        setError();
        setEditable(!editable);
        
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const [data2, setData2] = useState();

  const changeAvatar = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
    setData2(e.target.files[0]);
  };

  return (
    <div className="profile">
      <div className="profile_inner">
        <div className="profile_main_title">Профиль</div>
        <div className="profile_content">
          <div className="profile_icon">
            {editable ? null : (
              <img
                src={
                  profile?.avatar
                    ? preview
                      ? preview
                      : profile?.avatar
                    : profile_none_icon
                }
                alt=""
              />
            )}
            {editable ? (
              <label className="profile_label" htmlFor="i">
                <div className={active ? "profile_label_icon" : "none"}>
                  Изменить
                </div>
                <img
                  className="profile_avatar"
                  onMouseOver={() => setActive(true)}
                  onMouseOut={() => setActive(false)}
                  src={
                    profile?.avatar
                      ? preview
                        ? preview
                        : profile?.avatar
                      : profile_none_icon
                  }
                  alt=""
                />
              </label>
            ) : null}
            <input
              className="none"
              id="i"
              type="file"
              onChange={(e) => changeAvatar(e)}
              hidden
            />
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Имя</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.first_name}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("first_name")}
                    type="text"
                    defaultValue={profile?.first_name}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.first_name ? error?.first_name : ""}
              </span>
            </div>
            <div className="profile_item">
              <div className="profile_item_title">Номер телефона</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.phone}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("phone")}
                    type="text"
                    defaultValue={profile?.phone}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.phone ? error?.phone : ""}
              </span>
            </div>
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Фамилия</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.last_name}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("last_name")}
                    type="text"
                    defaultValue={profile?.last_name}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.last_name ? error?.last_name : ""}
              </span>
            </div>
            <div className="profile_item">
              <div className="profile_item_title">Электронная почта</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.email}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("email")}
                    type="text"
                    defaultValue={profile?.email}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.email ? error?.email : ""}
              </span>
            </div>
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Группа</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.group}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("group")}
                    type="text"
                    defaultValue={profile?.group}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.group ? error?.group : ""}
              </span>
            </div>

            <div className="profile_item">
              <div className="profile_item_title">Баллы</div>

              {editable ? null : (
                <div className="profile_item_text">{profile?.point}</div>
              )}

              {editable ? (
                <div className="profile_item_input">
                  <input
                    {...register("point")}
                    type="number"
                    defaultValue={profile?.point}
                  />
                </div>
              ) : null}
              <span className="error_text">
                {error?.point ? error?.point : ""}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="profile_item_blocks">
          <div className="profile_item">
            <div className="profile_item_title">Роль</div>

            {editable ? null : (
              <div className="profile_item_text">
                {profile?.role === "is_head`" ? "1" : "2"}
              </div>
            )}

            {editable ? (
              <div className="profile_item_input">
                <input
                  {...register("role")}
                  type="text"
                  defaultValue={ profile?.role}
                />
              </div>
            ) : null}
          </div>
          <div className="profile_item">
            <div className="profile_item_title">Последнее действие</div>

            {editable ? null : (
              <div className="profile_item_text">
                { profile?.last_activity}
              </div>
            )}

            {editable ? (
              <div className="profile_item_input">
                <input
                  {...register("last_activity")}
                  type="number"
                  defaultValue={
                     profile?.last_activity
                  }
                />
              </div>
            ) : null}
          </div>
        </div> */}
        <div className="profile_change_btn">
          {editable ? (
            <button onClick={handleSubmit(onSubmit)}>
              Применить изменения
            </button>
          ) : (
            <button onClick={() => setEditable(!editable)}>
              Редактировать профиль
            </button>
          )}
          <button
            style={{ marginLeft: "15px" }}
            onClick={() => navigate('/reset-password')}
          >
            izmenit пароль
          </button>
        </div>
      </div>
    </div>
  );
};
