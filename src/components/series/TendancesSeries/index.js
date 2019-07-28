import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';
import Spinner from '../../Molecules/Spinner';

function TendancesFilms() {
    const [tendancesFilms, setTendancesFilms] = useState([]);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const [timeValue, setTimeValue] = useState("week");
    const tendancesFilmsUrl = `https://api.themoviedb.org/3/trending/movies/${timeValue}?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadTendancesFilms();
    }, []);

    async function loadTendancesFilms() {
        try {
            const dataTendancesFilms = await axios.get(tendancesFilmsUrl);
            console.log("data ", dataTendancesFilms);
            setTendancesFilms(dataTendancesFilms.data.results);
            console.log("tendancesFilms ", dataTendancesFilms);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className="container">
                <div className="content">
                    <h2>Les films en tendances</h2>
                    <div className="movies">
                    {pending ? <Spinner /> : tendancesFilms && tendancesFilms.map((film, index) => (
                        <Link href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id} className="text-decoration-none">
                            <div className="row detail-film">
                                <div className="col-xs-12 col-md-3 detail-film-poster">
                                    <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} className="card-img-top" alt={`Poster du film ${film.title}`} />
                                </div>
                                <div className="col-xs-12 col-md-9">
                                    <div className="card-body">
                                        <p className="card-title film-detail-title">
                                            {film && film.title}
                                        </p>
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={film && film.vote_average}
                                        />
                                        <p><i className="fas fa-thumbs-up"></i>&nbsp;{film && film.vote_count}</p>
                                        <p className="film-detail">
                                            Titre original 
                                            <span>
                                            &nbsp;{film && film.original_title}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Date de sortie 
                                            <span>
                                            &nbsp;{moment(film && film.release_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Genres 
                                            <span>
                                                &nbsp;{film && film.genre_ids}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            <span className="film-detail">
                                                Synopsis
                                            </span>
                                            &nbsp;{film && film.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TendancesFilms;