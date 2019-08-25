import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import Nav from "../../components/Nav";
import HeaderBanner from "../../components/HeaderBanner";

function Accueil() {
  useEffect(() => {
    document.title = "O'Films | Accueil";
  });

  return (
    <div className="App">
      <Nav />
      <HeaderBanner />
    </div>
  );
}

export default Accueil;
