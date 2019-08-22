import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useForceUpdate from 'use-force-update';

import '../../App.css';
import Nav from '../../components/Nav';
import Spinner from '../../components/Molecules/Spinner';

function Series() {
    const [afficheSeries, setAfficheSeries] = useState([]);
    const [tendancesSeries, setTendancesSeries] = useState([]);
    const [bestRatedSeries, setBestRatedSeries] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [timeValue, setTimeValue] = useState("week");
    const [pending, setPending] = useState(true);
    const tendancesSeriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const bestRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        document.title = "O'Films | Séries";
        loadTendancesSeries();
        loadBestRatedSeries();
    }, [])

    async function loadTendancesSeries() {
        try {
            const dataTendancesSeries = await axios.get(tendancesSeriesUrl);
            console.log("tendancesSeries ", dataTendancesSeries);
            setTendancesSeries(dataTendancesSeries.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadBestRatedSeries() {
        try {
            const dataBestRatedSeries = await axios.get(bestRatedSeriesUrl);
            console.log("bestRatedSeries ", dataBestRatedSeries);
            setBestRatedSeries(dataBestRatedSeries.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Nav />
            <h2 className="media-type">Séries</h2>
            <div className="container content">
                <div className="film-types">
                    <h3 className="film-types-title">Les séries en tendances
                        <p className="film-types-suite">
                            <Link href="/series/tendances" to="/series/tendances">
                                Voir plus
                            </Link>
                        </p>
                    </h3>
                    {pending ? <Spinner /> :
                        <>
                            <div className="film-types-datas scrolling-wrapper">
                                {tendancesSeries && tendancesSeries.map((serie, index) => (
                                    <Link href={`/serie/${serie.id}`} to={`/serie/${serie.id}`} key={serie.id} className={`text-decoration-none card ${index !== 0 ? "film-types-container" : ""}`}>
                                        <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={`Poster du film ${serie.title}`} className={`${index !== 0 ? "film-types-img" : "film-types-img-first"}`} />
                                        <p className="film-types-title">{!serie.title ? serie.name : serie.title}</p>
                                    </Link>
                                ))}
                            </div>
                            <hr />
                        </>
                    }
                </div>
                <div className="film-types">
                    <h3 className="film-types-title">Les séries les mieux notées
                        <p className="film-types-suite">
                            <Link href="/series/populaires" to="/series/populaires">
                                Voir plus
                            </Link>
                        </p>
                    </h3>
                    {pending ? <Spinner /> :
                        <>
                            <div className="film-types-datas scrolling-wrapper">
                                {bestRatedSeries && bestRatedSeries.map((serie, index) => (
                                    <Link href={`/serie/${serie.id}`} to={`/serie/${serie.id}`} key={serie.id} className={`text-decoration-none card ${index !== 0 ? "film-types-container" : ""}`}>
                                        <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={`Poster du film ${serie.title}`} className={`${index !== 0 ? "film-types-img" : "film-types-img-first"}`} />
                                        <p className="film-types-title">{serie && serie.original_name}</p>
                                        <p className="film-types-date">{serie && serie.first_air_date.slice(0, 4)}</p>
                                    </Link>
                                ))}
                            </div>
                            
                            <hr />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Series;