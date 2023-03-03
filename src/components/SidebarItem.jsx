import React from "react";
import { Link, NavLink } from "react-router-dom";



export const SidebarItem = ({image, title, to}) => {
  return (
    <NavLink to={to} className="mainlayout_sidebar_item">
      <div className="mainlayout_sidebar_twice">
        <img src={image} alt="" />
        <div className="mainlayout_sidebar_text">{title}</div>
      </div>
      <div className="mainlayout_sidebar_active"></div>
    </NavLink>
  );
};
