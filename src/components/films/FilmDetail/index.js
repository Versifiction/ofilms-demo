import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import StarRatingComponent from 'react-star-rating-component';
import Flag from 'react-world-flags';
import ItemsCarousel from 'react-items-carousel';
import $ from 'jquery';
import moment from 'moment';

import Nav from '../../Nav';

function FilmDetail({ match }) {
    const [filmDetail, setFilmDetail] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [videosFilm, setVideosFilm] = useState([]);
    const [photosFilm, setPhotosFilm] = useState([]);
    const [seeAllVideos, setSeeAllVideos] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [pending, setPending] = useState(true);
    const filmDetailUrl = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const similarFilmsUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
    const videosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const photosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadFilmDetail();
        loadSimilarFilms();
        loadVideosFilm();
        loadPhotosFilm();
    }, []);

    async function loadFilmDetail() {
        try {
            const dataFilmDetail = await axios.get(filmDetailUrl);
            console.log("data ", dataFilmDetail);
            setFilmDetail(dataFilmDetail.data);
            console.log("filmDetail ", filmDetail);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadSimilarFilms() {
        try {
            const dataSimilarFilms = await axios.get(similarFilmsUrl);
            console.log("data ", dataSimilarFilms);
            setSimilarFilms(dataSimilarFilms.data.results);
            setPending(false);
            document.getElementsByClassName('sc-bdVaJa')[0].style.width = "100%";
            $('#nav-photos').hide()
            $('.nav-link').click(function(event){ 
                $(this).addClass('active').siblings().removeClass('active');
                $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
                event.target.id === "nav-photos-tab" ? $('#nav-photos').show() : $('#nav-photos').hide();
                $("body").find(`[aria-labelledby="${event.target.id}"`).addClass('show active').siblings().removeClass('show active');
            }); 
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadVideosFilm() {
        try {
            const dataVideosFilm = await axios.get(videosFilmUrl);
            console.log("data ", dataVideosFilm);
            setVideosFilm(dataVideosFilm.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadPhotosFilm() {
        try {
            const dataPhotosFilm = await axios.get(photosFilmUrl);
            console.log("data ", dataPhotosFilm);
            setPhotosFilm(dataPhotosFilm.data.posters);
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
                <div className="content" style={{ padding: "20px" }}>
                    <h2 style={{ textAlign: "center", color: "#343a40", marginTop: "100px", marginBottom: "40px", textTransform: "uppercase" }}>{filmDetail.title}</h2>
                    <div className="movies" style={{ marginTop: "40px" }}>
                    {pending ? <i className="fas fa-spinner fa-spin" style={{ color: "rgb(52, 58, 64)" }}></i> :
                        <div className="row detail-film" key={filmDetail.id} style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px" }}>
                            <div className="col-xs-12 col-md-3" style={{ padding: "20px" }}>
                                <img src={`http://image.tmdb.org/t/p/w500${filmDetail.poster_path}`} className="card-img-top" alt={`Poster du film ${filmDetail.title}`} style={{ width: "100%" }} />
                            </div>
                            <div className="col-xs-12 col-md-9">
                                <ul className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-infos-tab" data-toggle="tab" href="#nav-infos" role="tab" aria-controls="nav-infos" aria-selected="true" style={{ color: "rgb(52, 58, 64)", textTransform: "uppercase", fontWeight: "bold" }}>Infos</a>
                                    {videosFilm && videosFilm.length > 0 && <a className="nav-item nav-link" id="nav-bandesannonces-tab" data-toggle="tab" href="#nav-bandesannonces" role="tab" aria-controls="nav-bandesannonces" aria-selected="false" style={{ color: "rgb(52, 58, 64)", textTransform: "uppercase", fontWeight: "bold" }}>Bandes annonces</a>}
                                    <a className="nav-item nav-link" id="nav-photos-tab" data-toggle="tab" href="#nav-photos" role="tab" aria-controls="nav-photos" aria-selected="false" style={{ color: "rgb(52, 58, 64)", textTransform: "uppercase", fontWeight: "bold" }}>Photos</a>
                                </ul>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-infos" role="tabpanel" aria-labelledby="nav-infos-tab">
                                        <div className="card-body">
                                            {filmDetail && filmDetail.production_countries.map((country) => (
                                                <Flag code={`${country.iso_3166_1}`} key={country.name} style={{ width: "30px", marginBottom: "10px", marginRight: "10px", display: "inline-block" }} />
                                            ))}
                                            <br />
                                            <StarRatingComponent 
                                                name="rate1" 
                                                starCount={10}
                                                value={filmDetail.vote_average}
                                            />
                                            <p><i className="fas fa-thumbs-up" style={{ color: "green" }}></i>&nbsp;{filmDetail.vote_count}</p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Titre original 
                                                <span style={{ color: "black", fontWeight: "initial" }}>
                                                &nbsp;{filmDetail.original_title}
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Date de sortie 
                                                <span style={{ color: "black", fontWeight: "initial" }}>
                                                &nbsp;{moment(filmDetail.release_date).format('DD/MM/YYYY')}
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Genres 
                                                <span style={{ color: "black", fontWeight: "initial" }}>
                                                    &nbsp;{filmDetail && filmDetail.genres.map((genre, index) => <p key={index} style={{ display: "inline-block", textTransform: "capitalize", marginBottom: "0" }}>{index !== 0 ? `/ ${genre.name}` : genre.name}&nbsp;</p>)}
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Durée du film 
                                                <span style={{ color: "black", fontWeight: "initial", textTransform: "lowercase" }}>
                                                    &nbsp;{filmDetail.runtime} minutes
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold", display: "inline-block" }}>
                                                Production 
                                                <span style={{ color: "black", fontWeight: "initial", textTransform: "capitalize" }}>
                                                    &nbsp;{filmDetail && filmDetail.production_companies.map((company, index) => <p key={index} style={{ display: "inline-block", marginBottom: "0" }}>{index !== 0 ? `/ ${company.name}` : company.name}&nbsp;</p>)}
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Budget 
                                                <span style={{ color: "black", fontWeight: "initial", textTransform: "lowercase" }}>
                                                    &nbsp;{filmDetail.budget.toLocaleString()} $
                                                </span>
                                            </p>
                                            <p style={{ fontSize: "14px", marginBottom: "0", color: "#cdad76", textTransform: "uppercase", fontWeight: "bold" }}>
                                                Recette
                                                <span style={{ color: "black", fontWeight: "initial", textTransform: "lowercase" }}>
                                                    &nbsp;{filmDetail.revenue.toLocaleString()} $
                                                </span>
                                            </p>
                                            <br />
                                            <p className="card-text">
                                                <span style={{ color: "#cdad76", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px" }}>
                                                    Synopsis
                                                </span>
                                                &nbsp;{filmDetail.overview}
                                            </p>
                                        </div>
                                    </div>
                                    {videosFilm && videosFilm.length > 0 && (
                                        <div className="tab-pane fade" id="nav-bandesannonces" role="tabpanel" aria-labelledby="nav-bandesannonces-tab">
                                            <p className="card-text">
                                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                    {seeAllVideos ? videosFilm && videosFilm.map((video, index) => <div key={index} style={{ width: "50%" }}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)
                                                    : videosFilm && videosFilm.slice(0, 4).map((video, index) => <div key={index} style={{ width: "50%" }}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)}
                                                    {!seeAllVideos && videosFilm.length > 4 && <p onClick={() => setSeeAllVideos(!seeAllVideos)} style={{ cursor: "pointer", textAlign: "center", width: "100%" }}>Voir toutes les vidéos</p>}
                                                </div>
                                            </p>
                                        </div>
                                    )}
                                    {photosFilm && photosFilm.length > 0 && (
                                        <div className="tab-pane fade" id="nav-photos" role="tabpanel" aria-labelledby="nav-photos-tab">
                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                {photosFilm && photosFilm.map((photo, index) => <img key={index} src={`http://image.tmdb.org/t/p/w500${photo.file_path}`} style={{ width: "50%" }} />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                    {similarFilms.length > 0 && (
                        <div>
                            <div style={{ padding: "20px" }}>
                                <h3>Films similaires</h3>
                            </div>
                            <div className="row similar-films" style={{ marginBottom: "10px", boxShadow: "grey 0 0 10px 2px", padding: "20px" }}>
                        <ItemsCarousel
                            gutter={10}
                            activePosition={'center'}
                            chevronWidth={10}
                            numberOfCards={4}
                            slidesToScroll={2}
                            outsideChevron={true}
                            showSlither={false}
                            firstAndLastGutter={false}
                            activeItemIndex={activeItemIndex}
                            requestToChangeActive={value => setActiveItemIndex(value)}
                            rightChevron={<i className="fas fa-chevron-right"></i>}
                            leftChevron={<i className="fas fa-chevron-left"></i>}
                        >
                            {similarFilms && similarFilms.map((film) => (
                                <div className="col-xs-12" key={film.id}>
                                    <Link href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id} style={{ textDecoration: "none" }}>
                                        <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} alt={`Poster du film ${film.title}`} style={{ height: "200px", display: "block", margin: "0 auto" }} />
                                        <br />
                                        <p style={{ textAlign: "center" }}>{film.title}</p>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <StarRatingComponent 
                                                name="rate1" 
                                                starCount={10}
                                                value={film.vote_average}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </ItemsCarousel>
                    </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FilmDetail;