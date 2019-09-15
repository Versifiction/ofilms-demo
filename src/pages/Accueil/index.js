import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import Nav from "../../components/Nav";
import HeaderBanner from "../../components/HeaderBanner";
import FloatingChat from "../../components/FloatingChat";

function Accueil() {
  useEffect(() => {
    document.title = "O'Films | Accueil";
  });

  return (
    <div className="App">
      <Nav />
      <HeaderBanner />
      <FloatingChat />
    </div>
  );
}

export default Accueil;
