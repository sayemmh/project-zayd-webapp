import React from "react";
import "../css/button.css";
import qlogo from "../logos/quran.png";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";

const Header = () => {

  return (
    <div className="header">
      <h2> project zayd </h2>
      <img className="logo" src={qlogo} alt="Logo" />
    </div>
  );
};

export default Header;
