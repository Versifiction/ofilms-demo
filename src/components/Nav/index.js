/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import useForceUpdate from "use-force-update";
import M from "materialize-css";
import $ from "jquery";

import "../../App.css";

function Nav() {
  const [sideNavActive, setSideNavActive] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [pending, setPending] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const elementPosition = $(".navbar").offset();
    document.getElementsByClassName("sidenav-overlay")[0].style.opacity = "0";
    M.AutoInit();

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

  function toggleSideNav() {
    setSideNavActive(!sideNavActive);
  }

  async function handleChange(e) {
    setSearchInputValue(e.target.value);
    console.log("target value ", e.target.value);
    console.log("searchInputValue ", searchInputValue);

    try {
      const searchResult = await axios.post(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&query=${e.target.value}`
      );
      setSearchResult(searchResult.data.results);
      setPending(false);
      console.log("list of the search: ", searchResult);
    } catch (error) {
      console.error(error);
    }

    forceUpdate();
  }

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
                  <form action="" class="browser-default right">
                    <input
                      id="search-input"
                      // placeholder={
                      //   "Rechercher un film, une série, un acteur..."
                      // }
                      type="text"
                      class="browser-default search-field"
                      name="q"
                      value={searchInputValue}
                      autocomplete="off"
                      aria-label="Search box"
                      // onFocus={toggleSearchActive}
                      // onBlur={toggleSearchActive}
                      onChange={e => handleChange(e)}
                    />
                    <label for="search-input">
                      <i
                        class="material-icons search-icon tooltipped"
                        data-position="bottom"
                        data-tooltip="Rechercher un film, une série, un acteur..."
                        style={{ cursor: "pointer" }}
                      >
                        search
                      </i>
                    </label>
                    <i
                      class="material-icons search-close-icon"
                      onClick={() => setSearchInputValue("")}
                    >
                      cancel
                    </i>
                    <div class="search-popup">
                      <div class="search-content">
                        <ul class="popup-list">
                          {searchResult &&
                            searchResult.map(result => (
                              <li class="" style={{ marginBottom: "30px" }}>
                                <Link
                                  class="grey-text"
                                  href={`/${result.media_type}/${result.id}`}
                                  to={`/${result.media_type}/${result.id}`}
                                  style={{
                                    height: "100px",
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  {result.media_type === "person" ||
                                  result.media_type === "tv" ? (
                                    <>
                                      <span>
                                        <img
                                          src={
                                            result.profile_path == null
                                              ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                              : `http://image.tmdb.org/t/p/w500${result.profile_path}`
                                          }
                                          style={{ width: "50px" }}
                                        />
                                      </span>
                                      <p
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginLeft: "10px"
                                        }}
                                      >
                                        {result.name}
                                        <span
                                          style={{
                                            fontSize: "10px",
                                            textTransform: "uppercase",
                                            marginLeft: "6px",
                                            backgroundColor: "#95878b",
                                            color: "white",
                                            padding: "0px 10px"
                                          }}
                                        >
                                          {result.media_type === "person"
                                            ? "Personne"
                                            : "Série"}
                                        </span>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <span>
                                        <img
                                          src={
                                            result.poster_path == null
                                              ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                                              : `http://image.tmdb.org/t/p/w500${result.poster_path}`
                                          }
                                          style={{ width: "50px" }}
                                        />
                                      </span>
                                      <p
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginLeft: "10px"
                                        }}
                                      >
                                        {result.title}
                                        <span
                                          style={{
                                            fontSize: "10px",
                                            textTransform: "uppercase",
                                            marginLeft: "6px",
                                            backgroundColor: "#95878b",
                                            color: "white",
                                            padding: "0px 10px"
                                          }}
                                        >
                                          Film
                                        </span>
                                      </p>
                                    </>
                                  )}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </form>
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
      <ul
        id="slide-out"
        class="sidenav dark"
        style={{ transform: sideNavActive ? "translateX(0%)" : "" }}
        onClick={toggleSideNav}
      >
        <li>
          <div class="user-view">
            <div>
              <a href="/">O'Films</a>
            </div>
          </div>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/movies"
            to="/movies"
          >
            <i class="material-icons colored">local_movies</i>Films
          </NavLink>
        </li>
        <li>
          <NavLink
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
            class="waves-effect waves-light"
            activeClassName="active"
            href="/tv"
            to="/tv"
          >
            <i class="material-icons colored">tv</i>Séries
          </NavLink>
        </li>
        <li>
          <NavLink
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
            class="waves-effect waves-light"
            activeClassName="active"
            href="/series/mieux-notees"
            to="/series/mieux-notees"
          >
            Séries les mieux notées
          </NavLink>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/categories"
            to="/categories"
          >
            <i class="material-icons colored">view_list</i>
            <span id="txt1">Catégories</span>
          </NavLink>
        </li>
        <div class="divider"></div>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/forum"
            to="/forum"
          >
            <i class="material-icons colored">forum</i>
            <span id="txt1">Forum</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/chat"
            to="/chat"
          >
            <i class="material-icons colored">chat</i>
            <span id="txt1">Chat</span>
          </NavLink>
        </li>
        <div class="divider"></div>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/a-propos"
            to="/a-propos"
          >
            <i class="material-icons colored">info</i>
            <span id="txt1">A propos</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/faq"
            to="/faq"
          >
            <i class="material-icons colored">format_list_bulleted</i>
            <span id="txt1">FAQ</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/contact"
            to="/contact"
          >
            <i class="material-icons colored">contact_mail</i>
            <span id="txt1">Contact</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            class="waves-effect waves-light"
            activeClassName="active"
            href="/mentions-legales"
            to="/mentions-legales"
          >
            <i class="material-icons colored">format_align_left</i>
            <span id="txt1">Mentions légales</span>
          </NavLink>
        </li>
        <div className="row" style={{ marginTop: "50px" }}>
          <div
            className="col s4"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px"
            }}
          >
            <i class="fab fa-twitter"></i>
          </div>
          <div
            className="col s4"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px"
            }}
          >
            <i class="fab fa-facebook-f"></i>
          </div>
          <div
            className="col s4"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px"
            }}
          >
            <i class="fab fa-instagram"></i>
          </div>
        </div>
      </ul>
    </>
  );
}

export default Nav;
