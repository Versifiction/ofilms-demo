import React from "react";

import API from "../../utils/API";

export class Dashboard extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <button onClick={this.disconnect} block bsSize="large" type="submit">
          Se déconnecter
        </button>
      </div>
    );
  }