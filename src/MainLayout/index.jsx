import React, { useContext } from "react";

import sidebar_home_icon from "../assets/svg/sidebar/sidebar_home_icon.svg";
import sidebar_history_icon from "../assets/svg/sidebar/sidebar_history_icon.svg";
import sidebar_profile_icon from "../assets/svg/sidebar/sidebar_profile_icon.svg";
import profile_none_icon from "../assets/svg/profile/profile_none_icon.svg";

import { SidebarItem } from "../components/SidebarItem";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ProfileContext } from "../App";

export const MainLayout = ({preview, name, navphone}) => {
  const {profile} =  useContext(ProfileContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('profile')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('point')
    navigate('/login')
  }
  console.log();

  return (
    <div className="mainlayout">
      <div className="mainlayout_sidebar">
        <div className="mainlayout_sidebar_items">
          <div className="mainlayout_sidebar_block">
          <div className="mainlayout_sidebar_title">
            Logo
          </div>
            <SidebarItem to={'/'} image={sidebar_home_icon} title='Главная'/>
            {profile?.role === 'is_staff' ? null : <SidebarItem to={'workmates'} image={sidebar_history_icon} title='Сотрудники'/>}
            <SidebarItem to={'profile'} image={sidebar_profile_icon} title='Профиль'/>
            {profile?.role === 'is_staff' ? null : <SidebarItem to={'/add-new-workmates'} image={sidebar_profile_icon} title='Создать новую учетную запись?'/>}
            
          </div>
            <div className="mainlayout_sidebar_btn">
                <button onClick={logout}>Выйти из аккаунта</button>
            </div>
        </div>
      </div>
      <div className="mainlayout_contents">
        <div className="mainlayout_navbar">
            <div className="mainlayout_profile_role">
                <div>Вы вошли с правами {profile?.role==='is_head' ? "советника" : "сотрудника" }</div>
                <div>Ваши баллы: <span style={{fontSize: '17px'}}>{profile?.point}</span></div>
              </div>
            <div className="mainlayout_profile">
                <div className="mainlayout_profile_images">
                </div>

                <Link to='profile' className="mainlayout_profile_icon">
                    <div className="mainlayout_profile_title">
                      <div>{name ? name : profile?.first_name + ' ' + profile?.last_name}</div>
                      <div>{navphone ? navphone : profile?.phone}</div>
                    </div>
                    <img src={ profile?.avatar
                    ? preview
                      ? preview
                      : profile?.avatar
                    : profile_none_icon} alt="" />
                </Link>
            </div>
        </div>
        <div className="mainlayout_content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};
