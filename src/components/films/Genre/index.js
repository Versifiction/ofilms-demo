import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from '../../Nav';
import useForceUpdate from 'use-force-update';
import Spinner from '../../Molecules/Spinner'
import Pagination from '../../Molecules/Pagination';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';



function Genre() {

    const [allGenres, setGenre] = useState(false); 
    const [allFilms, setAllFilms] = useState(false);   
    const [allFilmsParGenre, setAllFilmsParGenre]=useState(false); 
    const [pending, setPending] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const [totalResults, setTotalResults] = useState();
    const [id_du_genre, setId_du_genre]= useState();
    const allFilmsUrl= `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const allFilmsParGenreUrl= `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&with_genres=${id_du_genre}&page=1`
    const allGenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=fr`;
    const forceUpdate = useForceUpdate();

    const [totalPages, setTotalPages] = useState(0)
    
    const goToPage = val => setActivePage(val)
    const getFirst = () => setActivePage(1)
    const getPrevious = () => activePage > 1 ? setActivePage(activePage - 1) : ""
    const getNext = () => activePage < totalPages ? setActivePage(activePage + 1) : ""
    const getLast = () => setActivePage(totalPages)

    useEffect(() => {
        document.title = `O'Films | Les genres`;
        loadAllGenres();
        loadAllFilms();
        loadFilmsParGenre();
        window.scroll(0, 0);

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
        }
    }, []);

    async function loadAllGenres() {
        try {
            const dataAllGenres = await axios.get(allGenreUrl);
            console.log("Les genres : ", dataAllGenres.data.genres);
            setGenre(dataAllGenres.data.genres);
            setPending(false);
            forceUpdate()
          }
         catch (error) {
             console.error (error);
            }
    };

    async function loadAllFilms(){

        try{
            const dataAllFilms=await axios.get(allFilmsUrl);
            console.log("Les films : ", dataAllFilms.data.results);
            setAllFilms(dataAllFilms.data.results);
            setTotalResults(dataAllFilms.data.total_results);
            //setTotalPages(dataAllFilms.data.total_pages);
            setPending(false);
            forceUpdate();
        }
        catch(error){
            console.error(error);
        }

    }
    

    async function loadFilmsParGenre(){

        try{
            
            const maliste=document.getElementById('listeDeGenres');
            const monGenre=maliste.options[maliste.selectedIndex].value;
           // setId_du_genre(dataAllFilmsParGenre.data.results.genre_ids);
            const dataAllFilmsParGenre = await axios.get(allFilmsParGenreUrl);
            setAllFilmsParGenre(dataAllFilmsParGenre.data.results.genre_ids)
            
            setPending(false);
            forceUpdate();
            
        }
        catch(error){
            console.error(error);
        }
 }

      /**   handleChange(event) {
             this.setState({value: event.target.value});
            }

            handleSubmit(event) {
    
            }

  */

    return (
        <>
            <Nav />
            <div className="container content">
                <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "30px" }}>Les films par genre</h2>
                <div style={{ textAlign: "center" }}>
                    <form >
                        <select id="" name="listeDeGenres" onChange="loadFilmsParGenre()">
                            <option>Choisissez un genre s'il vous plaît</option>

                                 { allGenres && allGenres.map((genre, index) => (
                        
                            <option value={genre && genre.id}>{genre && genre.name}</option>
                        
                              ))}
                        </select>
                        <div style ={{padding:'10px', margin: '5px'}}></div>
                          <button  type="submit" value="Submit">Valider</button>
                    </form>
                </div>
                    <div style={{ textAlign: "center" ,margin: "10px"}} key={allFilms && allFilms.total_results}>
                        <label>Nombre de films : { allFilms && allFilms.total_results}</label> 
                    </div>
                <div className="movies" style={{ marginTop: "40px", display: "flex", flexWrap: "wrap" }}>
                {pending ? <Spinner /> : allFilms && allFilms.map((film, index) => (
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
        </>
    )
    

}

export default Genre;