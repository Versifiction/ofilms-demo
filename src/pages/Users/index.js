/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import useForceUpdate from "use-force-update";
import moment from "moment";

import "../../App.css";
import Spinner from "../../components/Molecules/Spinner";
import Nav from "../../components/Nav";

function Users() {
  const [usersList, setUsersList] = useState(false);
  const [pending, setPending] = useState(true);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    loadAllUsers();
  }, []);

  async function loadAllUsers() {
    try {
      const dataAllUsers = await axios.get(`http://localhost:4000/user`);
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
      .get(`http://localhost:4000/user/delete/${id}`)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
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
            className="striped responsive-table"
            style={{ color: "white" }}
          >
            <thead style={{ borderBottom: "1px solid white" }}>
              <tr>
                <th>ID</th>
                <th>E-mail</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Pseudo</th>
                <th>Sexe</th>
                <th>Téléphone mobile</th>
                <th>Ville</th>
                <th>Code postal</th>
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
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.sexe}</td>
                      <td>{user.mobilePhone}</td>
                      <td>{user.city}</td>
                      <td>{user.postalCode}</td>
                      <td>
                        {user.isAdmin ? (
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
                        <div
                          className="waves-effect waves-light btn modal-trigger"
                          href="#modal1"
                          style={{
                            backgroundColor: "red",
                            marginTop: "inherit"
                          }}
                        >
                          Supprimer
                        </div>
                      </td>
                    </tr>
                    <div id="modal1" class="modal">
                      <div class="modal-content">
                        <h4 style={{ color: "black" }}>
                          Suppression d'utilisateur
                        </h4>
                        <p>
                          Vous êtes sur le point de supprimer l'utilisateur.
                          Voulez-vous le supprimer ?
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
                    </div>
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
