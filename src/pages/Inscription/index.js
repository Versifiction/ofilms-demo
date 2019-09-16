import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import M from "materialize-css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { registerUser } from "../../store/actions/authActions";
import { connect } from "react-redux";

import "../../App.css";
import Nav from "../../components/Nav";

function Inscription(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstname: "",
    lastname: "",
    sexe: "",
    localisation: true,
    mobilePhone: "",
    postalCode: "",
    city: "",
    creationDate: "",
    errors: {}
  });

  useEffect(() => {
    document.title = "O'Films | Inscription";
    M.AutoInit();
    console.log("props ", props);
    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    if (props.errors) {
      setFields({ ...fields, errors: props.errors });
    }
  }, [props.errors]);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });

    forceUpdate();

    console.log("fields ", fields);
  }

  async function sendForm(e) {
    e.preventDefault();
    console.log("submit");

    setFields({ ...fields, creationDate: new Date() });

    const {
      email,
      password,
      username,
      firstname,
      lastname,
      sexe,
      mobilePhone,
      postalCode,
      city,
      confirmPassword
    } = fields;
    if (!email || email.length === 0) {
      return;
    }
    if (!password || password.length === 0 || password !== confirmPassword) {
      return;
    }
    // axios.post("/user/register", fields).then(res => console.log(res.data));
    this.props.registerUser(fields, this.props.history);
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Inscription</h2>
      <div className="row container">
        <div className="row">
          <form className="col s12" onSubmit={sendForm} autocomplete="off">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">mail</i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  value={fields.email}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent !important" }}
                  className="validate"
                  required
                />
                <label htmlFor="email">Adresse e-mail *</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">message</i>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={fields.username}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Entrez votre pseudo"
                  className="validate"
                  required
                />
                <label htmlFor="username">Pseudo *</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">contacts</i>
                <input
                  placeholder="Entrez votre prénom"
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={fields.firstname}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                  required
                />
                <label htmlFor="firstname">Prénom *</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">contacts</i>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Entrez votre nom"
                  value={fields.lastname}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                  required
                />
                <label htmlFor="lastname">Nom *</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">wc</i>
                <select
                  name="sexe"
                  id="sexe"
                  onChange={e => handleChange(e)}
                  value={fields.sexe}
                  required
                >
                  <option value="" disabled selectedvalue="true">
                    Sélectionnez votre sexe
                  </option>
                  <option value="H">Homme</option>
                  <option value="F">Femme</option>
                </select>
                <label htmlFor="sexe">Sexe *</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">phone</i>
                <input
                  id="mobilePhone"
                  type="text"
                  name="mobilePhone"
                  placeholder="Entrez votre numéro de téléphone mobile"
                  value={fields.mobilePhone}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                />
                <label htmlFor="mobilePhone">Téléphone mobile</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons colored prefix">place</i>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  placeholder="Entrez votre code postal"
                  value={fields.postalCode}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                />
                <label htmlFor="postalCode">Code postal</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons colored prefix">location_city</i>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Sélectionnez votre ville"
                  value={fields.city}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                />
                <label htmlFor="city">Ville</label>
              </div>
            </div>
            <div className="row">
              <div
                className="input-field col s6"
                style={{ position: "relative" }}
              >
                <i className="material-icons colored prefix">fingerprint</i>
                <input
                  placeholder="Entrez votre mot de passe"
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={fields.password}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  className="validate"
                  required
                />
                <i
                  className="tiny material-icons right tooltipped"
                  id="password"
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
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  {passwordVisible ? "visibility_off" : "visibility"}
                </i>
                <label htmlFor="password">Mot de passe *</label>
              </div>
              <div
                className="input-field col s6"
                style={{ position: "relative" }}
              >
                <i className="material-icons colored prefix">fingerprint</i>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={fields.confirmPassword}
                  onChange={e => handleChange(e)}
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Confirmez votre mot de passe"
                  className="validate"
                  required
                />
                <i
                  className="tiny material-icons right tooltipped"
                  id="confirmPassword"
                  data-position="bottom"
                  data-tooltip={
                    passwordVisible
                      ? "Masquer votre mot de passe"
                      : "Afficher votre mot de passe"
                  }
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "22.5px",
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  {confirmPasswordVisible ? "visibility_off" : "visibility"}
                </i>
                <label htmlFor="confirmPassword">
                  Confirmation du mot de passe *
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    id="check"
                    name="localisation"
                    className="filled-in"
                    value={fields.localisation}
                    onChange={e => handleChange(e)}
                    style={{ backgroundColor: "transparent" }}
                  />
                  <span>
                    J'accepte de partager la localisation de ma ville et
                    d'apparaître sur la carte du site
                  </span>
                </label>
              </div>
            </div>
            <div className="row center" style={{ marginTop: "40px" }}>
              <button
                // className={`btn waves-effect waves-light ${
                //   !submittable ? "disabled" : ""
                // }`}
                className="btn waves-effect waves-light"
                type="submit"
              >
                M'inscrire
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Inscription));
