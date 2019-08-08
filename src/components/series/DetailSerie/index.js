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

function DetailSerie({ match }) {
    const [serieDetail, setSerieDetail] = useState([]);
    const [castSerie, setCastSerie] = useState([]);
    const [crewSerie, setCrewSerie] = useState([]);
    const [similarSeries, setSimilarSeries] = useState([]);
    const [videosSerie, setVideosSerie] = useState([]);
    const [photosSerie, setPhotosSerie] = useState([]);
    const [keywordsSerie, setKeywordsSerie] = useState([]);
    const [seeAllVideos, setSeeAllVideos] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [pending, setPending] = useState(true);
    const serieDetailUrl = `https://api.themoviedb.org/3/tv/${match.params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const creditsSerieUrl = `https://api.themoviedb.org/3/tv/${match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
    const similarSeriesUrl = `https://api.themoviedb.org/3/tv/${match.params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=fr&page=1`;
    const videosSerieUrl = `https://api.themoviedb.org/3/tv/${match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const photosSerieUrl = `https://api.themoviedb.org/3/tv/${match.params.id}/images?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const keywordsSerieUrl = `https://api.themoviedb.org/3/tv/${match.params.id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        loadSerieDetail();
        loadCreditsSerie();
        loadSimilarSeries();
        loadVideosSerie();
        loadPhotosSerie();
        loadKeywordsSerie();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`
        }
    }, []);

    async function loadSerieDetail() {
        try {
            const dataSerieDetail = await axios.get(serieDetailUrl);
            console.log("SeriesDetail ", dataSerieDetail);
            setSerieDetail(dataSerieDetail.data);
            setPending(false);
            document.body.style.backgroundImage = `url("http://image.tmdb.org/t/p/original${dataSerieDetail.data.poster_path}")`
            document.title = `O'Films | ${dataSerieDetail.data.original_name}`
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadCreditsSerie() {
        try {
            const dataCreditsSerie = await axios.get(creditsSerieUrl);
            console.log("castSerie ", dataCreditsSerie.data.cast);
            console.log("crewSerie ", dataCreditsSerie.data.crew);
            setCastSerie(dataCreditsSerie.data.cast);
            setCrewSerie(dataCreditsSerie.data.crew);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadSimilarSeries() {
        try {
            const dataSimilarSeries = await axios.get(similarSeriesUrl);
            console.log("similarSeriess ", dataSimilarSeries);
            setSimilarSeries(dataSimilarSeries.data.results);
            setPending(false);
            document.getElementsByClassName('sc-bdVaJa')[0].style.width = "100%";
            $('#nav-photos').hide()
            $('.nav-link').click(function(event){ 
                $(this).addClass('active').siblings().removeClass('active');
                $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
                event.target.id === "nav-photos-tab" ? $('#nav-photos').show() : $('#nav-photos').hide();
                $("body").find(`[aria-labelledby="${event.target.id}"`).addClass('show active').siblings().removeClass('show active');
            });
            $('.sc-bxivhb').css({display: 'flex', justifyContent: 'center', alignItems: 'center'});
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadVideosSerie() {
        try {
            const dataVideosSerie = await axios.get(videosSerieUrl);
            console.log("videosSerie ", dataVideosSerie);
            setVideosSerie(dataVideosSerie.data.results);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadPhotosSerie() {
        try {
            const dataPhotosSerie = await axios.get(photosSerieUrl);
            console.log("photosSeries ", dataPhotosSerie);
            setPhotosSerie(dataPhotosSerie.data.posters);
            setPending(false);
            forceUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    async function loadKeywordsSerie() {
        try {
            const dataKeywordsSerie = await axios.get(keywordsSerieUrl);
            console.log("keywordsSerie ", dataKeywordsSerie);
            setKeywordsSerie(dataKeywordsSerie.data.keywords);
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
            <div className="container content">
                <div className="movies">
                {pending ? <Spinner /> :
                    <div className="row detail-film" key={serieDetail && serieDetail.id}>
                        <div className="col-xs-12 col-md-4 detail-film-poster">
                            <img src={`http://image.tmdb.org/t/p/w500${serieDetail && serieDetail.poster_path}`} className="card-img-top" alt={`Poster de la série ${serieDetail && serieDetail.title}`} />
                            <h2>{serieDetail && serieDetail.original_name}</h2>
                            <p className="film-detail">
                                            Titre original 
                                            <span>
                                            {serieDetail && serieDetail.original_name}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Genres 
                                            <span>
                                                {serieDetail && serieDetail.genres.map((genre, index) => <div key={index} className="no-margin-bottom text-capitalize film-detail-keywords"><p>{genre.name}</p></div>)}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Nombre de saisons 
                                            <span>
                                                {serieDetail && serieDetail.number_of_seasons && <p className="no-margin-bottom text-capitalize">{serieDetail.number_of_seasons}</p>}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Nombre d'épisodes
                                            <span>
                                                {serieDetail && serieDetail.number_of_episodes && <p className="no-margin-bottom text-capitalize">{serieDetail.number_of_episodes}</p>}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Première diffusion 
                                            <span>
                                            {moment(serieDetail && serieDetail.first_air_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Dernière diffusion 
                                            <span>
                                            {moment(serieDetail && serieDetail.last_air_date).format('DD/MM/YYYY')}
                                            </span>
                                        </p>
                                        <p className="film-detail film-detail-duree">
                                            Durée d'un épisode
                                            <span>
                                                {serieDetail && serieDetail.episode_run_time} minutes
                                            </span>
                                        </p>
                                        <p className="film-detail">
                                            Production 
                                            <span>
                                                {serieDetail && serieDetail.production_companies.map((company, index) => <p key={index} className="no-margin-bottom">{index !== 0 ? `/ ${company.name}` : company.name}</p>)}
                                            </span>
                                        </p>
                        </div>
                        <div className="col-xs-12 col-md-8">
                            <ul className="nav nav-tabs detail-film-videos" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" onClick={toggleTabs} id="nav-infos-tab" data-toggle="tab" href="#nav-infos" role="tab" aria-controls="nav-infos" aria-selected="true">Infos</a>
                                {serieDetail && serieDetail.seasons.length > 0 && <a className="nav-item nav-link" onClick={toggleTabs} id="nav-photos-tab" data-toggle="tab" href="#nav-photos" role="tab" aria-controls="nav-photos" aria-selected="false">Saisons</a>}
                                {videosSerie && videosSerie.length > 0 && <a className="nav-item nav-link" onClick={toggleTabs} id="nav-bandesannonces-tab" data-toggle="tab" href="#nav-bandesannonces" role="tab" aria-controls="nav-bandesannonces" aria-selected="false">Bandes annonces</a>}
                                {photosSerie && photosSerie.length > 0 && <a className="nav-item nav-link" onClick={toggleTabs} id="nav-photos-tab" data-toggle="tab" href="#nav-photos" role="tab" aria-controls="nav-photos" aria-selected="false">Photos</a>}
                            </ul>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-infos" role="tabpanel" aria-labelledby="nav-infos-tab">
                                    <div className="card-body">
                                        {serieDetail && serieDetail.origin_country && <Flag code={serieDetail.origin_country[0]} className="film-production-flag" />}
                                        <br />
                                        <StarRatingComponent 
                                            name="rate1" 
                                            starCount={10}
                                            value={serieDetail && serieDetail.vote_average}
                                        />
                                        <p><i className="fas fa-thumbs-up"></i>{serieDetail && serieDetail.vote_count}</p>
                                        <br />
                                        <p className="card-text film-detail">
                                            Synopsis
                                            <span>
                                               {serieDetail && serieDetail.overview} 
                                            </span>
                                        </p>
                                        {castSerie && castSerie.length > 0 && (<p className="card-text film-detail">
                                            Casting
                                            <span>
                                                <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                                                {castSerie && castSerie.map((cast) => <div key={cast.id} className="card"><img src={cast.profile_path == null ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible" : `http://image.tmdb.org/t/p/w500${cast.profile_path}`} className="card-img-top" alt={cast.name} /><br /><p className="film-detail-cast-name">{cast.name}</p><p className="film-detail-cast-character">{cast.character}</p></div>)}
                                                </div>
                                            </span>
                                        </p>)}
                                        {crewSerie && crewSerie.length > 0 && (<p className="card-text film-detail">
                                            Crew
                                            <span>
                                                <div className="film-detail-cast film-detail-cast-photos scrolling-wrapper">
                                                {crewSerie && crewSerie.map((crew) => <div key={crew.id} className="card"><img src={crew.profile_path == null ? "https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible" : `http://image.tmdb.org/t/p/w500${crew.profile_path}`} className="card-img-top" alt={crew.name} /><br /><p className="film-detail-crew-name">{crew.name}</p></div>)}
                                                </div>
                                            </span>
                                        </p>)}
                                        <div className="film-detail-keywords">{keywordsSerie && keywordsSerie.map((keyword) => <p>{keyword.name}</p>)}</div>
                                    </div>
                                </div>
                                {serieDetail && serieDetail.seasons.length > 0 && (
                                    <div className="tab-pane fade" id="nav-photos" role="tabpanel" aria-labelledby="nav-photos-tab">
                                        <div className="film-detail-photos-saisons row" style={{ padding: "20px" }}>
                                            {serieDetail && serieDetail.seasons.map((saison) => (
                                                <>
                                                    <div key={saison.season_number} className="col-xs-12 col-md-10">
                                                        <p className="film-detail">Saison <span>{saison.season_number}</span></p>
                                                        <p className="film-detail">Date de diffusion : <span>{moment(saison.air_date).format('DD/MM/YYYY')}</span></p>
                                                        <p className="film-detail">Nombre d'épisodes : <span>{saison.episode_count}</span></p>
                                                        {saison.overview !== "" ? <p className="film-detail">Résumé : <span>{saison.overview}</span></p> : ""}
                                                        <br />
                                                    </div>
                                                    {saison.poster_path ? <div className="col-xs-12 col-md-2">
                                                        <img src={`http://image.tmdb.org/t/p/w500${saison.poster_path}`} alt={`Poster de la série ${serieDetail.original_name}`} />
                                                    </div> : <div className="col-xs-12 col-md-2">
                                                        <img src="https://via.placeholder.com/200x300/2C2F33/FFFFFF/png?text=Image+non+disponible" alt={`Poster de la série ${serieDetail.original_name}`} />
                                                    </div>}
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {videosSerie && videosSerie.length > 0 && (
                                    <div className="tab-pane fade film-detail-videos" id="nav-bandesannonces" role="tabpanel" aria-labelledby="nav-bandesannonces-tab">
                                        <p className="card-text">
                                            <div>
                                                {seeAllVideos ? videosSerie && videosSerie.map((video, index) => <div key={index}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)
                                                : videosSerie && videosSerie.slice(0, 4).map((video, index) => <div key={index}><iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" allowFullScreen></iframe></div>)}
                                                {!seeAllVideos && videosSerie.length > 4 && <p onClick={() => setSeeAllVideos(!seeAllVideos)}>Voir toutes les vidéos</p>}
                                            </div>
                                        </p>
                                    </div>
                                )}
                                {photosSerie && photosSerie.length > 0 && (
                                    <div className="tab-pane fade" id="nav-photos" role="tabpanel" aria-labelledby="nav-photos-tab">
                                        <div className="film-detail-photos">
                                            {photosSerie && photosSerie.map((photo, index) => <img key={index} src={`http://image.tmdb.org/t/p/w500${photo.file_path}`} />)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
                </div>
                {similarSeries && similarSeries.length > 0 && (
                    <div>
                        <div className="similar-films-title">
                            <h3>Séries similaires</h3>
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
                                {similarSeries && similarSeries.map((serie) => (
                                    <div className="col-xs-12 similar-film-detail" key={serie.id}>
                                        <a href={`/serie/${serie.id}`} to={`/serie/${serie.id}`} key={serie.id}>
                                            <img src={`http://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={`Poster de la série ${serie.title}`} />
                                            <br />
                                            <p>{serie.original_name}</p>
                                            <p>({serie.first_air_date.slice(0, 4)})</p>
                                            <div className="col-xs-12 similar-film-detail-rating">
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={10}
                                                    value={serie.vote_average}
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

export default DetailSerie;