import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Spinner from '../Molecules/Spinner';
import useForceUpdate from 'use-force-update';
import Regex from 'regex';
import $ from 'jquery';

import '../../App.css';

function Nav () {

    
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [pending, setPending] = useState(true);
    const searchResultUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&query=${search}`;
    const forceUpdate = useForceUpdate();
    console.log(" url: ", searchResultUrl, " search: ", search);
    
    const regex = new Regex(/( )*/);
    console.log(regex.test("  "));
    const handleChange = event => {
      setSearch(event.target.value); 
      }; 

      const hide = event => {
        $('.searchresult').css('display', 'none');
      };

      const show = event => {
          if(regex.test(search) === false ){ 
        $('.searchresult').css('display', 'block');
          }
      };
      const selectedFilm = event => {
        if(regex.test(search) === false ){ 
      $('.film').css('display', 'block');
      $('.serie').css('display', 'none');
        }
    };
    const selectedSerie = event => {
        if(regex.test(search) === false ){ 
      $('.serie').css('display', 'block');
      $('.film').css('display', 'none');
        }
    };
    async function postSearch() {
      try {
        
          const searchResult = await axios.post(searchResultUrl);
          setSearchResult(searchResult.data.results);
          setPending(false);
          console.log("list of the search: ", searchResult, "search: ", search);
          
          forceUpdate();
          
      } catch (error) {
          console.error(error);
      }
    };

    useEffect(() => {
        const elementPosition = $('.navbar').offset();
        
        $(window).scroll(function(){
            if($(window).scrollTop() > elementPosition.top){
                $('.navbar').css('position','fixed').css('top','0');
            } else {
                $('.navbar').css('position','relative');
            }    
        });

        postSearch();

        if(regex.test(search) === true ){ 
            $('.searchresult').css('display', 'none');
              }
              else {
               $('.searchresult').css('display', 'block');
              }
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active nav-title">
                        <Link href="/" to="/">O'Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/films" to="/films">Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/series" to="/series">Séries</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/forum" to="/forum">Forum</Link>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Rechercher un film, une série, un acteur..." aria-label="Search" style={{ width: "325px", height: "50px", borderRadius: "0", marginRight: "0px !important", border: "inherit" }} />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit" style={{ borderRadius: "0" }}><i className="fas fa-search"></i></button>
                </form> */}
                <div className="search-container" >
                
                    <form action="" >
                       <div className="search"  onClick={show}>
                         <input type="text"  className="v" placeholder="Recherche de films/séries..." value={search} onChange={handleChange}   />
                    
                        </div>
                        <div className="searchresult" onMouseOut={hide} >

                           <div className="selectoption" onMouseOver={show}>
                           <a  href="#film"className="selected"><div>Film</div></a>
                           <a href="#serie"  className="selected"><div>Série</div></a>
                           <a href="#actor" className="selected"><div>Acteur</div></a>
                           </div>

                           <ul className="result" id="film" onMouseOver={show} >{pending ? "" : searchResult && searchResult.map((result) => (  
                              
                              <Link href={`/film/${result.id}`} to={`/film/${result.id}`} target="_parent" key={result.id}><li >{result.title}</li></Link>
                              
                               ))}
                            </ul>
                            <ul className="result" id="serie" onMouseOver={show} >{pending ? "" : searchResult && searchResult.map((result) => (  
                              
                              <Link href={`/serie/${result.id}`} to={`/serie/${result.id}`} target="_parent" key={result.id}><li >{result.original_name}</li></Link>
                              
                               ))}
                            </ul>
                            <ul className="result" id="actor" onMouseOver={show} >{pending ? "" : searchResult && searchResult.map((result =>   
                              result["media_type"] === "person" ? (<Link href={`/person/${result.id}`} to={`/person/${result.id}`} target="_parent" key={result.id}><li >{result.name}</li></Link>) : (console.log("type: ",result.media_type))  
                              
                               ))}
                               
                            </ul>

                       </div>
                    </form>
                  
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/connexion" to="/connexion">Se connecter</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/inscription" to="/inscription">S'inscrire</Link>
                    </li>
                </ul>
                
            </div>
            
        </nav>
    )
}

export default Nav;
