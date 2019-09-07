import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import useForceUpdate from "use-force-update";

//import { genres } from '../../utils/genres';
import Nav from "../../Nav";
import Spinner from "../../Molecules/Spinner";
import Pagination from "../../Molecules/Pagination";

function AfficheFilms() {
  const [afficheFilms, setAfficheFilms] = useState(false);
  const [categoriesFilms, setCategoriesFilms] = useState(false);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const afficheFilmsUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const categoriesFilmsUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
  const forceUpdate = useForceUpdate();
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const goToPage = val => setActivePage(val);
  const getFirst = () => setActivePage(1);
  const getPrevious = () =>
    activePage > 1 ? setActivePage(activePage - 1) : "";
  const getNext = () =>
    activePage < totalPages ? setActivePage(activePage + 1) : "";
  const getLast = () => setActivePage(totalPages);

  useEffect(() => {
    document.title = `O'Films | Les films à l'affiche`;
    loadAfficheFilms();
    loadCategoriesFilms();
    window.scroll(0, 0);

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, [activePage]);

  async function loadAfficheFilms() {
    try {
      const dataAfficheFilms = await axios.get(afficheFilmsUrl);
      console.log("data ", dataAfficheFilms);
      setAfficheFilms(dataAfficheFilms.data.results);
      console.log("afficheFilms ", afficheFilms);
      setTotalPages(dataAfficheFilms.data.total_pages);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCategoriesFilms() {
    try {
      const dataCategoriesFilms = await axios.get(categoriesFilmsUrl);
      console.log("data ", dataCategoriesFilms);
      setCategoriesFilms(dataCategoriesFilms.data.genres);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            color: "#ECEBEE",
            marginBottom: "20px",
            marginTop: "20px"
          }}
        >
          Les films à l'affiche
        </h2>
        <div className="movies">
          {pending ? (
            <Spinner />
          ) : (
            afficheFilms &&
            afficheFilms.map((film, index) => (
              <Link
                href={`/film/${film.id}`}
                to={`/film/${film.id}`}
                key={film.id}
                style={{
                  textDecoration: "none",
                  width: "50%",
                  padding: "10px",
                  height: "300px"
                }}
              >
                <div className="row film-encart">
                  <div className="col s12 m4" style={{ padding: "20px" }}>
                    <img
                      src={
                        film.poster_path !== null
                          ? `http://image.tmdb.org/t/p/w500${film.poster_path}`
                          : "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible"
                      }
                      className="card-img-top"
                      alt={`Poster du film ${film.title}`}
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col s12 m8">
                    <div className="card-body">
                      <p
                        className="card-title"
                        style={{
                          fontSize: "26px",
                          textTransform: "uppercase",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {film && film.title}
                      </p>
                      <div style={{ display: "flex" }}>
                        <StarRatingComponent
                          name="rate1"
                          starCount={10}
                          value={film && film.vote_average}
                        />
                        <span
                          style={{
                            color: "rgb(255, 180, 0)",
                            marginLeft: "6px"
                          }}
                        >
                          {film && film.vote_average}
                        </span>
                        /10
                      </div>
                      <span className="genres">
                        Genres
                        <span>
                          &nbsp;
                          {film && film.genre_ids}
                        </span>
                      </span>
                      <p className="card-text">
                        <span
                          style={{
                            color: "#0CD0FC",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          Synopsis
                        </span>
                        &nbsp;{film && film.overview.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="container">
        <Pagination
          getFirst={getFirst}
          getPrevious={getPrevious}
          getNext={getNext}
          getLast={getLast}
          goToPage={goToPage}
          activePage={activePage}
          setActivePage={setActivePage}
          total={totalPages}
        />
      </div>
    </>
  );
}

export default AfficheFilms;
