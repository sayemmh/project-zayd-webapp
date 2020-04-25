import React from "react";
import "../css/button.css";
import qlogo from "../logos/quran.png";

const Header = () => {

  return (
    <div className="header">
      <h2> project zayd </h2>
      <img className="logo" src={qlogo} alt="Logo" />
    </div>
  );
};

export default Header;
