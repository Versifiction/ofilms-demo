import React, { useEffect } from "react";
import "../../App";

import Nav from "../../components/Nav";

function Chat() {
  useEffect(() => {
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
  });
  return (
    <>
      <Nav />
      <h2>Chat</h2>
    </>
  );
}

export default Chat;
