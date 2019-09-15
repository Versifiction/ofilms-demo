import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";

import "../../App.css";
import Nav from "../../components/Nav";
import API from "../../utils/API";

function Connexion() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    document.title = "O'Films | Connexion";
  });

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();

    console.log("fields ", fields);
  }

  async function sendForm(e) {
    e.preventDefault();
    console.log("submit");

    setFields({ ...fields, lastConnection: new Date() });

    const { email, password } = fields;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login({
        email,
        password
      });
      localStorage.setItem("token", data.token);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Connexion</h2>
      <div className="row container">
        <div className="row">
          <form className="col s12 m6 push-m3" onSubmit={sendForm}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={e => handleChange(e)}
                  placeholder="Entrez votre adresse e-mail"
                  className="validate"
                />
                <label htmlFor="email">Adresse e-mail</label>
              </div>
            </div>
            <div className="row">
              <div
                className="input-field col s12"
                style={{ position: "relative" }}
              >
                <input
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  name="password"
                  value={fields.password}
                  onChange={e => handleChange(e)}
                  type={passwordVisible ? "text" : "password"}
                  className="validate"
                />
                <i
                  className="tiny material-icons colored right tooltipped"
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
                  {passwordVisible ? "visibility_off" : "visibility"}
                </i>
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="row center" style={{ marginTop: "40px" }}>
                <button
                  // className={`btn waves-effect waves-light ${
                  //   !submittable ? "disabled" : ""
                  // }`}
                  className="btn waves-effect waves-light"
                >
                  Me connecter
                  <i className="material-icons right">send</i>
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
