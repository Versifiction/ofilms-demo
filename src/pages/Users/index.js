import React, { useEffect, useState } from "react";
import axios from "axios";
import useForceUpdate from "use-force-update";

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
  return (
    <>
      <Nav />
      <div className="container">
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
                </tr>
              </thead>
              <tbody>
                {usersList &&
                  usersList.map(user => (
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Users;
