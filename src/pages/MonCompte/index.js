import React, { useEffect, useState } from "react";
import useForceUpdate from "use-force-update";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

import "../../App.css";
import Nav from "../../components/Nav";

function MonCompte(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const forceUpdate = useForceUpdate();
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    document.title = "O'Films | Mon compte";

    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  });

  function logout(e) {
    e.preventDefault();
    props.logoutUser();
  }

  return (
    <>
      <Nav />
      <h2 className="media-type">Mon compte</h2>
      <button onClick={logout}>
        Se déconnecter<i class="fas fa-sign-out-alt"></i>
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(MonCompte);
