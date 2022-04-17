import React from "react";
import "./styles/navbar.css";
function Navbar(props) {
  return (
    <ul>
      <li>
        <a
          className={window.location.pathname === "/" ? "active" : "link"}
          href="/"
        >
          Vista
        </a>
      </li>
      <li>
        <a
          className={
            window.location.pathname === "/imageupload" ? "active" : "link"
          }
          href="imageupload"
        >
          Image Upload
        </a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
      <li style={{ float: "right" }}>
        <a
          className={
            window.location.pathname === "/profile" ? "active" : "address"
          }
          href="profile"
        >
          {props.address}
        </a>
      </li>
    </ul>
  );
}

export default Navbar;
