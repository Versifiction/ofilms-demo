/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import useForceUpdate from "use-force-update";
import $ from "jquery";

import "../../App.css";

function Nav() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [pending, setPending] = useState(false);
  const searchResultUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&query=${searchInputValue}`;
  const [searchResult, setSearchResult] = useState(false);
  const forceUpdate = useForceUpdate();

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

  async function handleChange(e) {
    setSearchInputValue(e.target.value);
    console.log("target value ", e.target.value);
    console.log("searchValue ", searchInputValue);

    try {
      const searchResult = await axios.post(searchResultUrl);
      setSearchResult(searchResult.data.results);
      setPending(false);
      console.log("list of the search: ", searchResult);
    } catch (error) {
      console.error(error);
    }

    forceUpdate();
  }

  function toggleSearchActive() {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchInputValue("");
    }
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
                      placeholder={
                        searchActive
                          ? "Rechercher un film, une série, un acteur..."
                          : ""
                      }
                      type="text"
                      class="browser-default search-field"
                      name="q"
                      value={searchInputValue}
                      autocomplete="off"
                      aria-label="Search box"
                      onFocus={toggleSearchActive}
                      onBlur={toggleSearchActive}
                      onChange={e => handleChange(e)}
                    />
                    <label for="search-input">
                      <i
                        class="material-icons search-icon tooltipped"
                        data-position="bottom"
                        data-tooltip="Rechercher un film, une série, un acteur..."
                        style={{ cursor: "pointer" }}
                        onClick={toggleSearchActive}
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
                      {searchActive && (
                        <div class="search-content">
                          <ul class="popup-list">
                            {searchResult &&
                              searchResult.slice(0, 10).map(result => (
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
                                            display: "inline-block",
                                            marginLeft: "10px"
                                          }}
                                        >
                                          {result.name}
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
                                            display: "inline-block",
                                            marginLeft: "10px"
                                          }}
                                        >
                                          {result.title}
                                        </p>
                                      </>
                                    )}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
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
            href="/movies"
            to="/movies"
          >
            <i class="material-icons colored">local_movies</i>Films
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/movies/affiche"
            to="/movies/affiche"
          >
            Films à l'affiche
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/movies/tendances"
            to="/movies/tendances"
          >
            Films en tendances
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            class="waves-effect waves-light"
            activeClassName="active"
            href="/movies/mieux-notes"
            to="/movies/mieux-notes"
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
