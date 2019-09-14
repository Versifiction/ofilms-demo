import React, { useEffect } from "react";
import "../../App";

import Nav from "../../components/Nav";

function Contact() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
  });
  return (
    <>
      <Nav />
      <h2>Contact</h2>
    </>
  );
}

export default Contact;
