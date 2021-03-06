/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import useForceUpdate from "use-force-update";
import moment from "moment";
import M from "materialize-css";

import "../../App.css";
import Spinner from "../../components/Molecules/Spinner";
import Nav from "../../components/Nav";

function Users() {
  const [usersList, setUsersList] = useState(false);
  const [pending, setPending] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loadAllUsers();
    M.AutoInit();
  }, []);

  async function loadAllUsers() {
    try {
      const dataAllUsers = await axios.get(
        "http://localhost:5000/api/users/getAll"
      );
      console.log("data ", dataAllUsers);
      setUsersList(dataAllUsers.data);
      console.log("usersList ", usersList);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteUser(id) {
    axios
      .get(`http://localhost:5000/api/users/delete/${id}`)
      .then()
      .catch(err => console.log(err));

    window.location.reload();
  }

  return (
    <>
      <Nav />
      <h2>Utilisateurs</h2>
      {pending ? (
        <Spinner />
      ) : (
        <>
          <table
            className="striped responsive-table centered highlight"
            style={{ color: "white" }}
          >
            <thead style={{ borderBottom: "1px solid white" }}>
              <tr>
                <th>ID</th>
                <th>E-mail</th>
                <th>Pseudo</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Sexe</th>
                <th>Téléphone mobile</th>
                <th>Ville</th>
                <th>Département</th>
                <th>Admin</th>
                <th>Modérateur</th>
                <th>Connecté</th>
                <th>Date d'inscription</th>
                <th>Dernière connexion</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList.map(user => (
                  <>
                    <tr
                      key={user._id}
                      style={{ backgroundColor: "transparent" }}
                    >
                      <td>{user._id}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>
                        {user.sexe === "H" ? (
                          <i
                            class="fas fa-male"
                            style={{ fontSize: "30px", color: "#95878B" }}
                          ></i>
                        ) : (
                          <i
                            class="fa fa-female"
                            style={{ fontSize: "30px", color: "#0CD0FC" }}
                          ></i>
                        )}
                      </td>
                      <td>{user.mobilePhone}</td>
                      <td>{user.city}</td>
                      <td>{user.departement}</td>
                      <td>
                        {user.isAdmin ? (
                          <div class="switch">
                            <label>
                              N
                              <input type="checkbox" />
                              <span class="lever"></span>O
                            </label>
                          </div>
                        ) : (
                          <div class="switch">
                            <label>
                              N
                              <input type="checkbox" />
                              <span class="lever"></span>O
                            </label>
                          </div>
                        )}
                      </td>
                      <td>
                        {user.isModerator ? (
                          <i class="material-icons" style={{ color: "green" }}>
                            check
                          </i>
                        ) : (
                          <i class="material-icons" style={{ color: "red" }}>
                            close
                          </i>
                        )}
                      </td>
                      <td>
                        {user.isConnected ? (
                          <i class="material-icons" style={{ color: "green" }}>
                            check
                          </i>
                        ) : (
                          <i class="material-icons" style={{ color: "red" }}>
                            close
                          </i>
                        )}
                      </td>
                      <td>
                        {moment(user.creationDate).format(
                          "DD/MM/YYYY à hh:mm:ss"
                        )}
                      </td>
                      <td>
                        {moment(user.lastConnection).format(
                          "DD/MM/YYYY à hh:mm:ss"
                        )}
                      </td>
                      <td>
                        <button
                          data-target="modal1"
                          className="waves-effect waves-light btn modal-trigger"
                          style={{
                            backgroundColor: "red",
                            marginTop: "inherit"
                          }}
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                    {/* <div id="modal1" class="modal">
                      <div class="modal-content">
                        <h4 style={{ color: "black" }}>
                          Suppression d'utilisateur
                        </h4>
                        <p>
                          Vous êtes sur le point de supprimer l'utilisateur{" "}
                          {user._id}. Voulez-vous le supprimer ?
                        </p>
                      </div>
                      <div class="modal-footer" style={{ textAlign: "center" }}>
                        <div
                          class="modal-close waves-effect waves-light btn"
                          style={{ backgroundColor: "green" }}
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Oui
                        </div>
                        <div
                          class="modal-close waves-effect waves-green btn-flat"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            marginLeft: "10px"
                          }}
                        >
                          Non
                        </div>
                      </div>
                    </div> */}
                  </>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Users;
