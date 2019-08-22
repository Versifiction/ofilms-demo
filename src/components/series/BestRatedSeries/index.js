import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../../Nav';
import Spinner from '../../Molecules/Spinner'

function BestRatedSeries() {
    const [bestRatedSeries, setBestRatedSeries] = useState(false);
    const [allGenres, setAllGenres] = useState(false);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const bestRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const allGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        document.title = `O'Films | Les séries les mieux notées`
        loadBestRatedSeries();
        loadAllGenres();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`
        }
    }, []);

    async function loadBestRatedSeries() {
        try {
            const dataBestRatedSeries = await axios.get(bestRatedSeriesUrl);
            console.log("data ", dataBestRatedSeries);
            setBestRatedSeries(dataBestRatedSeries.data.results);
            console.log("bestRatedSeries ", bestRatedSeries);
            document.body.style.backgroundImage = `url("http://image.tmdb.org/t/p/original${dataBestRatedSeries.data.results[0].poster_path}")`
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadAllGenres() {
        try {
            const dataAllGenres = await axios.get(allGenresUrl);
            console.log("data ", dataAllGenres);
            setAllGenres(dataAllGenres.data.genres);
            console.log("allgenres ", allGenres);
            setPending(false);
            forceUpdate()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Nav />
            <div className="container content">
                <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>Les séries les mieux notées</h2>
                <div className="movies" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}>
                {pending ? <Spinner /> : bestRatedSeries && bestRatedSeries.map((serie, index) => (
                    <Link href={`/serie/${serie.id}`} to={`/serie/${serie.id}`} key={serie.id} style={{ textDecoration: "none", width: "50%", padding: "10px", height: "375px" }}>
                        <div className="row" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px", width: "100%", height: "100%" }}>
                            <div className="col-xs-12 col-md-4" style={{ padding: "20px" }}>
                                <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} className="card-img-top" alt={`Poster de la série ${serie.original_name}`} style={{ width: "100%" }} />
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <div className="card-body">
                                    <p className="card-title" style={{ fontSize: "26px", textTransform: "uppercase", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                        {serie && serie.original_name}
                                    </p>
                                    <StarRatingComponent 
                                        name="rate1" 
                                        starCount={10}
                                        value={serie && serie.vote_average}
                                    />
                                    <p style={{ fontSize: "14px", marginBottom: "0", color: "#23272A", textTransform: "uppercase", fontWeight: "bold" }}>
                                        Genres 
                                        <span style={{ color: "black", fontWeight: "initial" }}>
                                            &nbsp;{serie && serie.genre_ids}
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        <span style={{ color: "#23272A", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px" }}>
                                            Synopsis
                                        </span>
                                        &nbsp;{serie && serie.overview.substring(0, 200)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                </div>
            </div>
        </>
    )
}

export default BestRatedSeries;