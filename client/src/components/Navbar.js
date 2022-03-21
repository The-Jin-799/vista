import React from "react";
import "./styles/navbar.css";
function Navbar(props) {
  return (
    <ul>
      <li>
        <a href="/">Vista</a>
      </li>
      <li>
        <a href="imageupload">Image Upload</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
      <li style={{ float: "right" }}>
        <a className="active" href="profile">
          {props.address}
        </a>
      </li>
    </ul>
  );
}

export default Navbar;
