
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {api} from '../api/axios_config'

import profile_none_icon from "../assets/svg/profile/profile_none_icon.svg";

export const AddNewWorkmates = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [active, setActive] = useState(false);
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    api
      .post(
        "/api/v1/auth/register/",
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
          token: localStorage.getItem("token"),
        },

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) navigate("/login");
        else alert("error");
      });

    
  };
  const changeAvatar = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
    setData2(e.target.files[0]);
  };
  const [data2, setData2] = useState();

  return (
    <div className="register">
      <div className="register_inner">
        <div className="profile_main_title">
          Создание нового учетного запися
        </div>
        <div className="register_content">
          <div className="profile_icon">
            <label className="profile_label" htmlFor="i">
              <div className={active ? "profile_label_icon" : "none"}>
                Добавить
              </div>
              <img
                className="profile_avatar"
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}
                src={preview ? preview : profile_none_icon}
                alt=""
              />
            </label>
            <input
              className="none"
              id="i"
              type="file"
              onChange={(e) => changeAvatar(e)}
              hidden
            />
          </div>

          <div className="register_item_blocks">
            <div className="register_item_twice">
              <div className="profile_item">
                <div className="profile_item_title">Имя</div>
                <div className="register_item_input">
                  <input
                    {...register("first_name", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.first_name && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile_item">
                <div className="profile_item_title">Номер телефона</div>
                <div className="register_item_input">
                  <input
                    {...register("phone", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.phone && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="register_item_twice">
              <div className="profile_item">
                <div className="profile_item_title">Фамилия</div>
                <div className="register_item_input">
                  <input
                    {...register("last_name", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.last_name && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile_item">
                <div className="profile_item_title">Электронная почта</div>
                <div className="register_item_input">
                  <input
                    {...register("email", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.email && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="register_item_twice">
              <div className="profile_item">
                <div className="profile_item_title">Группа</div>
                <div className="register_item_input">
                  <input
                    {...register("group", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.group && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile_item">
                <div className="profile_item_title">Пароль</div>
                <div className="register_item_input">
                  <input
                    {...register("password", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.password && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="register_item_twice">
              <div className="profile_item">
                <div className="profile_item_title">Роль</div>
                <div className="register_item_input">
                  <input
                    {...register("role", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.role && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile_item">
                <div className="profile_item_title">Код</div>
                <div className="register_item_input">
                  <input
                    {...register("code", { required: true })}
                    type="text"
                  />
                  <div>
                    {errors?.code && (
                      <div className="error_text">
                        Пожалуйста заполните это поле!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="register_change_btn">
          <button onClick={handleSubmit(onSubmit)}>Добавить</button>
        </div>
      </div>
    </div>
  );
};
