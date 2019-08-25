import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import Nav from "../../components/Nav";

function Connexion() {
  useEffect(() => {
    document.title = "O'Films | Connexion";
  });

  return (
    <>
      <Nav />
      <div style={{ textAlign: "center" }}>
        <p>Page connexion</p>
      </div>
    </>
  );
}

export default Connexion;
