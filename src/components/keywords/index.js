import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import useForceUpdate from "use-force-update";

//import { genres } from '../../utils/genres';
import Nav from "../Nav";
import Spinner from "../Molecules/Spinner";
import Pagination from "../Molecules/Pagination";

function Keyword({ match }) {
  const [keyword, setKeyword] = useState(false);
  const [keywordName, setKeywordName] = useState(false);
  const [pending, setPending] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const keywordUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}/movies?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
  const keywordNameUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`;
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
    loadKeyword();
    loadKeywordName();

    return () => {
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    };
  }, []);

  async function loadKeyword() {
    try {
      const dataKeyword = await axios.get(keywordUrl);
      console.log("keyword ", dataKeyword);
      setKeyword(dataKeyword.data.results);
      setTotalPages(dataKeyword.data.total_pages);
      setPending(false);
      forceUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  async function loadKeywordName() {
    try {
      const dataKeywordName = await axios.get(keywordNameUrl);
      console.log("keywordName ", dataKeywordName);
      setKeywordName(dataKeywordName.data.name);
      document.title = `O'Films | ${dataKeywordName.data.name}`;
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
            color: "#95878B",
            marginBottom: "30px"
          }}
        >
          Liste de fictions avec le mot clé "{keywordName}"
        </h2>
        <div
          className="movies"
          style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}
        >
          {pending ? (
            <Spinner />
          ) : (
            keyword &&
            keyword.map((film, index) => (
              <Link
                href={`/movie/${film.id}`}
                to={`/movie/${film.id}`}
                key={film.id}
                style={{
                  textDecoration: "none",
                  width: "50%",
                  padding: "10px",
                  height: "375px"
                }}
              >
                <div
                  className="row"
                  style={{
                    marginBottom: "10px",
                    padding: "20px",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <div className="col s12 m4" style={{ padding: "20px" }}>
                    <img
                      src={`http://image.tmdb.org/t/p/w500${film.poster_path}`}
                      className="card-img-top"
                      alt={`Poster du film ${film.title}`}
                      style={{ width: "100%" }}
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
                      <StarRatingComponent
                        name="rate1"
                        starCount={10}
                        value={film && film.vote_average}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          marginBottom: "0",
                          color: "#0CD0FC",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          display: "block"
                        }}
                      >
                        Genres
                        <span
                          style={{ color: "#95878b", fontWeight: "initial" }}
                        >
                          &nbsp;{film && film.genre_ids}
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

export default Keyword;
