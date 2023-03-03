import axios from "../api/axios_config";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import input_eye from "../assets/svg/register/input_eye.svg";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const [error, setError] = useState()

  // useEffect(() => {
  //   axios
  //   .post("/api/v1/auth/login/", data)
  //   .then((res) =>
  //     {localStorage.setItem(
  //       "profile",
  //       JSON.stringify(res.data),
  //       localStorage.setItem("token", res.data.token),
  //       localStorage.setItem("id", res.data.id)
  //     )
  //     if (res.status === 200) navigate("/");
  //     else alert("error");
  //   }
  //   )
  // },[])

  const onSubmit = (data) => {
    axios
      .post("/api/v1/auth/change-password/",data,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      },)
      .then((res) =>  
        {
        if (res.status === 200) navigate("/profile");
        else alert("error");
      }
      )
      .catch(error => {
        setError(error.response.data);
      });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className="register">
      <div className="register_inner">
        <div>
          <div className="register_title">Izmenit</div>
          <form className="register_form">
            <div className="register_inputs">
              <div className="register_form_item">
                <div className="register_form_title">Пароль</div>
                <input
                  {...register("old_password")}
                  placeholder="Your password"
                  type="text"
                  className="register_form_input"
                />
                 <span className="error_text">{error?.old_password ? error?.old_password : ''}</span>
              </div>
              <div className="register_form_item">
                <div className="register_form_title">Пароль</div>
                <div className="register_form_block">
                  <input
                    {...register("password")}
                    placeholder="Your password"
                    type={passwordShown ? "text" : "password"}
                    className="register_form_input"
                  />
                  <img
                    className="register_form_img"
                    src={input_eye}
                    onClick={() => setPasswordShown(!passwordShown)}
                    alt=""
                  />
                </div>
                <span className="error_text">{error?.password ? error?.password : ''}</span>
              </div>
              <div className="register_form_item">
                <div className="register_form_title">Пароль</div>
                <div className="register_form_block">
                  <input
                    {...register("password_confirm")}
                    placeholder="Your password"
                    type={passwordShown ? "text" : "password"}
                    className="register_form_input"
                  />
                  <img
                    className="register_form_img"
                    src={input_eye}
                    onClick={() => setPasswordShown(!passwordShown)}
                    alt=""
                  />
                </div>
                <span className="error_text">{error?.password_confirm ? error?.password_confirm : ''}</span>
              </div>
              <Link to="/add-new-workmates" className="register_forgot">
                Создать новую учетную запись?
              </Link>
            </div>
          </form>
        </div>
        <div className="register_btn">
          <button onClick={handleSubmit(onSubmit)}>Вход</button>
        </div>
        <span className="error_text">{error?.login ? error?.login : ''}</span>
      </div>
    </div>
  );
};
