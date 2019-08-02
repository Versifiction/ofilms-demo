import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';
import Spinner from '../../Molecules/Spinner';

function TendancesSeries() {
    const [tendancesSeries, setTendancesSeries] = useState([]);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const tendancesSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadTendancesSeries();
    }, []);

    async function loadTendancesSeries() {
        try {
            const dataTendancesSeries = await axios.get(tendancesSeriesUrl);
            console.log("data ", dataTendancesSeries);
            setTendancesSeries(dataTendancesSeries.data.results);
            console.log("tendancesFilms ", dataTendancesSeries);
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
                    <h2>Les séries en tendances</h2>
                    <div className="movies">
                    {pending ? <Spinner /> : tendancesSeries && tendancesSeries.map((serie, index) => (
                        <Link href={`/serie/${serie.id}`} to={`/serie/${serie.id}`} key={serie.id} className="text-decoration-none">
                            <div className="row detail-film">
                                <div className="col-xs-12 col-md-3 detail-film-poster">
                                    <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} className="card-img-top" alt={`Poster de la série ${serie.original_name}`} />
                                </div>
                                <div className="col-xs-12 col-md-9">
                                    <div className="card-body">
                                        <p className="card-title film-detail-title">
                                            {serie && serie.original_name}
                                        </p>
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={serie && serie.vote_average}
                                        />
                                        <p className="film-detail">
                                            Date de sortie 
                                            <span>
                                            {moment(serie && serie.release_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Genres 
                                            <span>
                                                {serie && serie.genre_ids}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Synopsis
                                            <span>
                                                {serie && serie.overview}
                                            </span>
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

export default TendancesSeries;