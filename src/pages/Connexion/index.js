import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import Nav from "../../components/Nav";

function Connexion() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    document.title = "O'Films | Connexion";
  });

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Connexion</h2>
      <div className="row container">
        <div class="row">
          <form class="col s12 m6 push-m3">
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  class="validate"
                />
                <label for="email">Adresse e-mail</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12" style={{ position: "relative" }}>
                <input
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  class="validate"
                />
                <i
                  class="tiny material-icons colored right tooltipped"
                  data-position="bottom"
                  data-tooltip={
                    passwordVisible
                      ? "Masquer votre mot de passe"
                      : "Afficher votre mot de passe"
                  }
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "22.5px",
                    cursor: "pointer"
                  }}
                >
                  {passwordVisible ? "visibility" : "visibility_off"}
                </i>
                <label for="password">Mot de passe</label>
              </div>
              <div className="row center" style={{ marginTop: "40px" }}>
                <button class="btn waves-effect waves-light">
                  Me connecter
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s12 m6 push-m3">
            <div style={{ textDecoration: "underline", textAlign: "center" }}>
              <a href="/inscription">Pas encore de compte ? Inscrivez-vous !</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connexion;
