import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import useForceUpdate from 'use-force-update';

//import { genres } from '../../utils/genres';
import Nav from '../Nav';
import Spinner from '../Molecules/Spinner';

function Keyword({ match }) {
    const [keywordSeries, setKeywordSeries] = useState(false);
    const [keywordName, setKeywordName] = useState(false);
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const keywordSeriesUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}/movies?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=${activePage}`;
    const keywordNameUrl = `https://api.themoviedb.org/3/keyword/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadKeywordSeries();
        loadKeywordName();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`
        }
    }, []);

    async function loadKeywordSeries() {
        try {
            const dataKeywordSeries = await axios.get(keywordSeriesUrl);
            console.log("keywordSeries ", dataKeywordSeries);
            setKeywordSeries(dataKeywordSeries.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

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
    };

    return (
        <>
            <Nav />
            <div className="container content">
                <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>Liste de fictions avec le mot clé "{keywordName}"</h2>
                <div className="movies" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}>
                {pending ? <Spinner /> : keywordSeries && keywordSeries.map((serie, index) => (
                    <Link href={`/keyword/${serie.id}`} to={`/keyword/${serie.id}`} key={serie.id} style={{ textDecoration: "none", width: "50%", padding: "10px", height: "375px" }}>
                        <div className="row" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px", width: "100%", height: "100%" }}>
                            <div className="col-xs-12 col-md-4" style={{ padding: "20px" }}>
                                <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} className="card-img-top" alt={`Poster de la serie ${serie.title}`} style={{ width: "100%" }} />
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <div className="card-body">
                                    <p className="card-title" style={{ fontSize: "26px", textTransform: "uppercase", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                        {serie && serie.title}
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

export default Keyword;