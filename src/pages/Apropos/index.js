import React, { useEffect } from "react";
import "../../App.css";

import Nav from "../../components/Nav";

function Apropos() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
  });
  return (
    <>
      <Nav />
      <h2>A propos</h2>
    </>
  );
}

export default Apropos;
