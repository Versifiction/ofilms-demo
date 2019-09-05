import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';
import Spinner from '../../Molecules/Spinner';
import Pagination from '../../Molecules/Pagination';

function UpComingFilms() {
    const [upComingFilms, setUpComingFilms] = useState(false);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const UpComingFilmsUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const forceUpdate = useForceUpdate();
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [totalPages, setTotalPages] = useState(0)

  const goToPage = val => setActivePage(val)
    const getFirst = () => setActivePage(1)
    const getPrevious = () => activePage > 1 ? setActivePage(activePage - 1) : ""
    const getNext = () => activePage < totalPages ? setActivePage(activePage + 1) : ""
    const getLast = () => setActivePage(totalPages)

    useEffect(() => {
        document.title = `O'Films | Les films à venir`
        loadUpcomingFilms();
        window.scroll(0, 0);

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`
        }
    }, [activePage]);

    async function loadUpcomingFilms() {
        try {
            const dataUpcomingFilms = await axios.get(UpComingFilmsUrl);
            console.log("Les films à venir ", dataUpcomingFilms);
            setUpComingFilms(dataUpcomingFilms.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className="container content">
                <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>Les films à venir</h2>
                <div className="movies" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}>
                {pending ? <Spinner /> : upComingFilms && upComingFilms.map((film, index) => (
                    <Link href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id} style={{ textDecoration: "none", width: "50%", padding: "10px", height: "375px" }}>
                        <div className="row" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px", width: "100%", height: "100%" }}>
                            <div className="col-xs-12 col-md-4" style={{ padding: "20px" }}>
                                <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={`Poster du film ${film.title}`} style={{ width: "100%" }} />
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <div className="card-body">
                                    <p className="card-title" style={{ fontSize: "26px", textTransform: "uppercase", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                        {film && film.title}
                                    </p>
                                    <StarRatingComponent 
                                        name="rate1" 
                                        starCount={10}
                                        value={film && film.vote_average}
                                    />
                                    <p style={{ fontSize: "14px", marginBottom: "0", color: "#23272A", textTransform: "uppercase", fontWeight: "bold" }}>
                                        Genres 
                                        <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{film && film.genre_ids}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        <span style={{ color: "#23272A", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px" }}>
                                            Synopsis
                                        </span>
                                        &nbsp;{film && film.overview.substring(0, 130)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
            <div className="container content">
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
    )
}

export default UpComingFilms;