import React from "react";
import { Link } from 'react-router-dom';

import '../../App.css';

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active nav-title">
                        <Link href="/" to="/" style={{ color: "#cdad76" }}>O'Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/films" to="/films">Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/series" to="/series">Séries</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/forum" to="/forum">Forum</Link>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Rechercher un film, une série, un acteur..." aria-label="Search" style={{ width: "325px", height: "50px", borderRadius: "0", marginRight: "0px !important", border: "inherit" }} />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit" style={{ borderRadius: "0" }}><i className="fas fa-search"></i></button>
                </form> */}
                <div class="search-container">
                    <input type="text" placeholder="Recherche de films/séries..." />
                    <div class="search"></div>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/connexion" to="/connexion">Se connecter</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/inscription" to="/inscription">S'inscrire</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;