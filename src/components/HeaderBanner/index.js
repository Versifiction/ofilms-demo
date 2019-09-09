import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import AccueilBanner from "../../images/bg-header.jpg";

function Nav() {
  const style = {
    backgroundImage: "url(" + AccueilBanner + ")",
    width: "100%",
    height: "calc(100vh - 64px)",
    position: "relative"
  };

  return (
    <div className="accueil-banniere" style={style}>
      <h1 className="accueil-title">O'Films</h1>
      <p className="accueil-text">
        Les meilleurs films. Les meilleures séries.
      </p>
      <Link href="/inscription" to="/inscription" style={{ color: "#0cd0fc" }}>
        <button class="btn-large waves-effect waves-light">
          S'inscrire
          <i class="material-icons right">send</i>
        </button>
      </Link>
      <div className="bounce">
        <i
          class="fas fa-angle-double-down fa-2x"
          style={{ color: "white" }}
        ></i>
      </div>
    </div>
  );
}

export default Nav;
