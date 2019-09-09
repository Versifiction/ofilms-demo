/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";

import "../../App.css";

function Nav() {
  useEffect(() => {
    const elementPosition = $(".navbar").offset();

    //   $(window).scroll(function() {
    //     if ($(window).scrollTop() > elementPosition.top) {
    //       $(".navbar")
    //         .css("position", "fixed")
    //         .css("top", "0");
    //     } else {
    //       $(".navbar").css("position", "relative");
    //     }
    //   });
  });

  return (
    <>
      <nav>
        <div class="nav-wrapper">
          <div class="row container">
            <div class="col s12">
              <div
                data-target="slide-out"
                class="sidenav-trigger show-on-large"
                style={{ height: "64px" }}
              >
                <i class="material-icons colored" style={{ cursor: "pointer" }}>
                  menu
                </i>
              </div>
              <a
                href="/"
                class="brand-logo center"
                style={{ color: "#0CD0FC", textTransform: "uppercase" }}
              >
                O'Films
              </a>
              <ul class="hide-on-med-and-down right">
                <li>
                  <a
                    class="waves-effect waves-light tooltipped"
                    data-position="bottom"
                    data-tooltip="Rechercher un film, une série, un acteur..."
                    href="/connexion"
                  >
                    <i
                      class="material-icons prefix"
                      style={{ color: "#0CD0FC" }}
                    >
                      search
                    </i>
                  </a>
                </li>
                <li>
                  <a
                    class="waves-effect waves-light tooltipped"
                    data-position="bottom"
                    data-tooltip="Se connecter / S'inscrire"
                    href="/connexion"
                  >
                    <i class="material-icons colored">person</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ul id="slide-out" class="sidenav dark">
        <li>
          <div class="user-view">
            <div>
              <a href="/">O'Films</a>
            </div>
          </div>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/films"
            to="/films"
          >
            <i class="material-icons colored">local_movies</i>Films
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/films/affiche"
            to="/films/affiche"
          >
            Films à l'affiche
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/films/tendances"
            to="/films/tendances"
          >
            Films en tendances
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/films/mieux-notes"
            to="/films/mieux-notes"
          >
            Films les mieux notés
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/series"
            to="/series"
          >
            <i class="material-icons colored">tv</i>Séries
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/series/tendances"
            to="/series/tendances"
          >
            Séries en tendances
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/series/mieux-notees"
            to="/series/mieux-notees"
          >
            Séries les mieux notées
          </NavLink>
        </li>
        <li>
          <a class="waves-effect waves-light" href="#!">
            <i class="material-icons colored">view_list</i>
            <span id="txt1">Catégories</span>
          </a>
        </li>
      </ul>
    </>
  );
}

export default Nav;
