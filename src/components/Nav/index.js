/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
          <a class="waves-effect waves-light" href="/films">
            <i class="material-icons colored">local_movies</i>Films
          </a>
        </li>
        <li>
          <a class="waves-effect waves-light subcategory" href="/films/affiche">
            Films à l'affiche
          </a>
        </li>
        <li>
          <a
            class="waves-effect waves-light subcategory"
            href="/films/tendances"
          >
            Films en tendances
          </a>
        </li>
        <li>
          <a
            class="waves-effect waves-light subcategory"
            href="/films/mieux-notes"
          >
            Films les mieux notés
          </a>
        </li>
        <li>
          <a class="waves-effect waves-light" href="/series">
            <i class="material-icons colored">tv</i>Séries
          </a>
        </li>
        <li>
          <a
            class="waves-effect waves-light subcategory"
            href="/series/tendances"
          >
            Séries en tendances
          </a>
        </li>
        <li>
          <a
            class="waves-effect waves-light subcategory"
            href="/series/mieux-notees"
          >
            Séries les mieux notées
          </a>
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
