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
import Spinner from '../../Molecules/Spinner';
//import placeholder from '../../../images/placeholder.png';

function DetailFilm({ match }) {
    const [filmDetail, setFilmDetail] = useState([]);
    const [castFilm, setCastFilm] = useState([]);
    const [crewFilm, setCrewFilm] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [videosFilm, setVideosFilm] = useState([]);
    const [photosFilm, setPhotosFilm] = useState([]);
    const [keywordsFilm, setKeywordsFilm] = useState([]);
    const [seeAllVideos, setSeeAllVideos] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [pending, setPending] = useState(true);
    const filmDetailUrl = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const creditsFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
    const similarFilmsUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
    const videosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const photosFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const keywordsFilmUrl = `https://api.themoviedb.org/3/movie/${match.params.id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadFilmDetail();
        loadCreditsFilm();
        loadSimilarFilms();
        loadVideosFilm();
        loadPhotosFilm();
        loadKeywordsFilm();
        $('#nav-photos').hide()
        $('.nav-link').click(function(event){ 
            $(this).addClass('active').siblings().removeClass('active');
            $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
            event.target.id === "nav-photos-tab" ? $('#nav-bandesannonces').show() : $('#nav-bandesannonces').hide();
            event.target.id === "nav-photos-tab" ? $('#nav-photos').show() : $('#nav-photos').hide();
            $("body").find(`[aria-labelledby="${event.target.id}"`).addClass('show active').siblings().removeClass('show active');
        });
    }, []);

    async function loadFilmDetail() {
        try {
            const dataFilmDetail = await axios.get(filmDetailUrl);
            console.log("filmDetail ", dataFilmDetail);
            setFilmDetail(dataFilmDetail.data);
               setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadCreditsFilm() {
        try {
            const dataCreditsFilm = await axios.get(creditsFilmUrl);
            console.log("castFilm ", dataCreditsFilm.data.cast);
            console.log("crewFilm ", dataCreditsFilm.data.crew);
            setCastFilm(dataCreditsFilm.data.cast);
            setCrewFilm(dataCreditsFilm.data.crew);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadSimilarFilms() {
        try {
            const dataSimilarFilms = await axios.get(similarFilmsUrl);
            console.log("similarFilms ", dataSimilarFilms);
            setSimilarFilms(dataSimilarFilms.data.results);
            setPending(false);
            document.getElementsByClassName('sc-bdVaJa')[0].style.width = "100%";
            $('.sc-bxivhb').css({display: 'flex', justifyContent: 'center', alignItems: 'center'});
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadVideosFilm() {
        try {
            const dataVideosFilm = await axios.get(videosFilmUrl);
            console.log("videosFilm ", dataVideosFilm);
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
            console.log("photosFilm ", dataPhotosFilm);
            setPhotosFilm(dataPhotosFilm.data.posters);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadKeywordsFilm() {
        try {
            const dataKeywordsFilm = await axios.get(keywordsFilmUrl);
            console.log("keywordsFilm ", dataKeywordsFilm);
            setKeywordsFilm(dataKeywordsFilm.data.keywords);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    function toggleTabs(event) {
        $('.active').removeClass('active');
        $(event.target).addClass('active');
        $(event.target).attr('aria-selected', true).siblings().attr('aria-selected', false);
        event.target.id === "nav-photos-tab" ? $('#nav-photos').show() : $('#nav-photos').hide();
        $("body").find(`[aria-labelledby="${event.target.id}"`).addClass('show active').siblings().removeClass('show active');
    }

    return (
        <>
            <Nav />
            <div className="banniere-film-detail" 
                style={{ backgroundImage: `url("http://image.tmdb.org/t/p/w500${filmDetail && filmDetail.poster_path}")`, backgroundSize: "cover", backgroundPosition: "center", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            </div>
            <div className="container content">
                <div className="movies">
                {pending ? <Spinner /> :
                    <div className="row detail-film" key={filmDetail && filmDetail.id}>
                        <div className="col-xs-12 col-md-4 detail-film-poster">
                            <img src={`http://image.tmdb.org/t/p/w500${filmDetail && filmDetail.poster_path}`} className="card-img-top" alt={`Poster du film ${filmDetail && filmDetail.title}`} />
                            <h2>{filmDetail && filmDetail.title}</h2>
                            <p className="film-detail">
                                            Titre original 
                                            <span>
                                            {filmDetail && filmDetail.original_title}
                                            </span>
                                        </p>
                            <p className="film-detail">
                                Catégories 
                                <span>
                                    {filmDetail && filmDetail.genres.map((genre, index) => <div key={index} className="no-margin-bottom text-capitalize film-detail-keywords"><p>{genre.name}</p></div>)}
                                </span>
                            </p>
                            <p className="film-detail">
                                Date de sortie 
                                <span>
                                {moment(filmDetail && filmDetail.release_date).format('DD/MM/YYYY')}
                                </span>
                            </p>
                            <p className="film-detail film-detail-duree">
                                Durée du film 
                                <span>
                                    {filmDetail && filmDetail.runtime} minutes
                                </span>
                            </p>
                            <p className="film-detail">
                                Production 
                                <span>
                                    {filmDetail && filmDetail.production_companies.map((company, index) => <p key={index} className="no-margin-bottom production-companies">{company.name}&nbsp;</p>)}
                                </span>
                            </p>
                            <p className="film-detail">
                                Budget 
                                <span>
                                    {filmDetail && filmDetail.budget.toLocaleString()} $
                                </span>
                            </p>
                            <p className="film-detail">
                                Recette
                                <span>
                                    {filmDetail && filmDetail.revenue.toLocaleString()} $
                                </span>
                            </p>
                            <p className="film-detail">
                                Mots-clés
                                <span>
                                    <div className="film-detail-keywords">{keywordsFilm && keywordsFilm.map((keyword) => <p>{keyword.name}</p>)}</div>
                                </span>
                            </p>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <ul className="nav nav-tabs detail-film-videos" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" onClick={toggleTabs} id="nav-infos-tab" data-toggle="tab" href="#nav-infos" role="tab" aria-controls="nav-infos" aria-selected="true">Infos</a>
                                {videosFilm && videosFilm.length > 0 && <a className="nav-item nav-link" onClick={toggleTabs} id="nav-bandesannonces-tab" data-toggle="tab" href="#nav-bandesannonces" role="tab" aria-controls="nav-bandesannonces" aria-selected="false">Bandes annonces</a>}
                                {photosFilm && photosFilm.length > 0 && <a className="nav-item nav-link" onClick={toggleTabs} id="nav-photos-tab" data-toggle="tab" href="#nav-photos" role="tab" aria-controls="nav-photos" aria-selected="false">Photos</a>}
                            </ul>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-infos" role="tabpanel" aria-labelledby="nav-infos-tab">
                                    <div className="card-body">
                                        {filmDetail && filmDetail.production_countries && filmDetail.production_countries.map((country) => (
                                            <Flag code={`${country.iso_3166_1}`} key={country.name} className="film-production-flag" />
                                        ))}
                                        <br />
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={filmDetail && filmDetail.vote_average}
                                        />
                                        <p><i className="fas fa-thumbs-up"></i>{filmDetail && filmDetail.vote_count}</p>
                                        <br />
                                        <p className="film-detail">
                                            Synopsis
                                            <span>
                                                {filmDetail && filmDetail.overview}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Casting
                                            <span>
                                                <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                                                    {castFilm && castFilm.slice(0, 6).map((cast) => 
                                                        <div key={cast.id} className="card">
                                                            <img src={cast.profile_path == null ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible" : `http://image.tmdb.org/t/p/w500${cast.profile_path}`} className="card-img-top" alt={cast.name} />
                                                            <br />
                                                            <p className="film-detail-cast-name">{cast.name}</p>
                                                            <p className="film-detail-cast-character">{cast.character}</p>
                                                        </div>
                                                    )}
                                                </div>  
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Crew
                                            <span>
                                                <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                                                    {crewFilm && crewFilm.slice(0, 6).map((crew) => 
                                                        <div key={crew.id} className="card">
                                                            <img src={crew.profile_path == null ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible" : `http://image.tmdb.org/t/p/w500${crew.profile_path}`} className="card-img-top" alt={crew.name} />
                                                            <br />
                                                            <p className="film-detail-cast-name">{crew.name}</p>
                                                            <p className="film-detail-cast-character">{crew.job}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                {videosFilm && videosFilm.length > 0 && (
                                    <div className="tab-pane fade film-detail-videos" id="nav-bandesannonces" role="tabpanel" aria-labelledby="nav-bandesannonces-tab">
                                        <p className="card-text">
                                            <div>
                                                {seeAllVideos ? videosFilm && videosFilm.slice(0, 8).map((video, index) => <div key={index}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)
                                                : videosFilm && videosFilm.slice(0, 4).map((video, index) => <div key={index}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)}
                                                {!seeAllVideos && videosFilm.length > 4 && <p onClick={() => setSeeAllVideos(!seeAllVideos)}>Voir plus de vidéos</p>}
                                            </div>
                                        </p>
                                    </div>
                                )}
                                {photosFilm && photosFilm.length > 0 && (
                                    <div className="tab-pane fade" id="nav-photos" role="tabpanel" aria-labelledby="nav-photos-tab">
                                        <div className="film-detail-photos">
                                            {photosFilm && photosFilm.map((photo, index) => <img key={index} src={`http://image.tmdb.org/t/p/w500${photo.file_path}`} />)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
                </div>
                {similarFilms && similarFilms.length > 0 && (
                    <div>
                        <div className="similar-films-title">
                            <h3>Films similaires</h3>
                        </div>
                        <div className="row similar-films">
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
                                    <div className="col-xs-12 similar-film-detail" key={film.id}>
                                        <a href={`/film/${film.id}`} to={`/film/${film.id}`} key={film.id}>
                                            <img src={`http://image.tmdb.org/t/p/w500${film.poster_path}`} alt={`Poster du film ${film.title}`} />
                                            <br />
                                            <p>{film.title}</p>
                                            <div className="col-xs-12 similar-film-detail-rating">
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={10}
                                                    value={film.vote_average}
                                                />
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </ItemsCarousel>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DetailFilm;