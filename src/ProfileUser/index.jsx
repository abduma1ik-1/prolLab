import axios, { api } from "../api/axios_config";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import profile_none_icon from "../assets/svg/profile/profile_none_icon.svg";
import profile_change_icon from "../assets/svg/profile/profile_change_icon.svg";
import { useParams } from "react-router-dom";

export const ProfileUser = ({ preview, setPreview }) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  const [editable, setEditable] = useState(false);
  const [active, setActive] = useState(false);

  const month = ['Январь', 'Февраль ', 'Март', 'Апрель', 'Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',]
  
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/auth/users/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data));

    axios
      .get(
        `http://85.193.91.49/api/v1/points/?staff=${id}&head=${profile.id}&use_pagination=false`
      )
      .then((res) => {
        setPoints(res.data);
        console.log(res.data);
      });
  }, []);

  const onSubmit = async (data) => {
    await axios
      .patch(
        "/api/v1/auth/profile/",
        {
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
      .then(setEditable(!editable))
      .then((res) => localStorage.setItem("profile", JSON.stringify(res.data)));
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
                  user?.id
                    ? user?.avatar
                      ? user?.avatar
                      : profile?.avatar
                      ? preview
                        ? preview
                        : profile?.avatar
                      : profile_none_icon
                    : profile_none_icon
                }
                alt=""
              />
            )}
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Имя</div>

              {editable ? null : (
                <div className="profile_item_text">{user?.first_name}</div>
              )}
            </div>
            <div className="profile_item">
              <div className="profile_item_title">Номер телефона</div>

              {editable ? null : (
                <div className="profile_item_text">{user?.phone}</div>
              )}
            </div>
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Фамилия</div>

              {editable ? null : (
                <div className="profile_item_text">{user?.last_name}</div>
              )}
            </div>
            <div className="profile_item">
              <div className="profile_item_title">Электронная почта</div>

              {editable ? null : (
                <div className="profile_item_text">{user?.email}</div>
              )}
            </div>
          </div>
          <div className="profile_item_blocks">
            <div className="profile_item">
              <div className="profile_item_title">Группа</div>

              {editable ? null : (
                <div className="profile_item_text">{user?.group}</div>
              )}
            </div>
           
            <div className="profile_item">
              <div className="profile_item_title">Баллы</div>
              <div className="peofile_item_text">
                  {user?.id ? user?.point : profile?.point}
                
              </div>
            </div>
          </div>
        </div>
        <div className="profile_main_title">Балы</div>
       {
        points.map((i, index) => (
          <div key={index} style={{margin: '0px'}} className="workmates_content">
          <div className="workmates_items">
          <div className="workmates_item">
              <div className="workmates_title">№:</div>
              {index + 1}
            </div>
            <div className="workmates_item">
              <div className="workmates_title">Балов:</div>
              {i.value}
            </div>
            <div className="workmates_item">
              <div className="workmates_title">Месяц:</div>
              {month[i.month - 1]}
            </div>
            <div className="workmates_item">
              <div className="workmates_title">Год:</div>
              {i.year}
            </div>
            <div className="workmates_item">
              <div className="workmates_title">Имя и фамилия:</div>
              {i.head_detail.get_full_name}
            </div>
          </div>
          
          
        </div>
        ))
       }
      </div>

      {/* <div className="profile_item_blocks">
        <div className="profile_item">
          <div className="profile_item_title">Роль</div>

          {editable ? null : (
            <div className="profile_item_text">
              {profile?.role === "is_head`" ? "1" : "2"}
            </div>
          )}
        </div>
        <div className="profile_item">
          <div className="profile_item_title">Последнее действие</div>

          {editable ? null : (
            <div className="profile_item_text">{user?.last_activity}</div>
          )}
        </div>
      </div> */}
      {/* <div className="profile_change_btn">
        <button onClick={handleSubmit(onSubmit)}>Применить изменения</button>
      </div> */}
    </div>
  );
};
