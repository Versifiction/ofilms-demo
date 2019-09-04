import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Spinner from '../Molecules/Spinner';
import useForceUpdate from 'use-force-update';
import $ from 'jquery';

import '../../App.css';

function Nav () {

    //let search =  axios.post({ search});
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [pending, setPending] = useState(true);
    const searchResultUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR&include_adult=false&query=${search}`;
    const forceUpdate = useForceUpdate();
    console.log(" url: ", searchResultUrl, " search: ", search);
    
    const handleChange = event => {
      setSearch(event.target.value); 
        
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
        postSearch();
       
        $(window).scroll(function(){
            if($(window).scrollTop() > elementPosition.top){
                $('.navbar').css('position','fixed').css('top','0');
            } else {
                $('.navbar').css('position','relative');
            }    
        });
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
                <div className="search-container">
                
                    <form action="">
                       <div className="search">
                         <input type="text"  className="v" placeholder="Recherche de films/séries..." value={search} onChange={handleChange}   />
                    
                        </div>
                        <div className="searchresult">

                           <div className="selectoption">
                           <a href="#film" className="selected" ><div>Film</div></a>
                           <a href="#serie" className="selected"><div>Série</div></a>
                           <a href="#actor" className="selected"><div>Acteur</div></a>
                           </div>

                           <select className="result" id="film">{pending ? "" : searchResult && searchResult.map((result) => (  
                              
                              <option  >{result.title}</option>
                              
                               ))}
                            </select>
                            <select className="result" id="serie" >{pending ? "" : searchResult && searchResult.map((result) => (  
                              
                              <option >{result.original_name}</option>
                              
                               ))}
                            </select>
                            <select className="result" id="actor" >{pending ? "" : searchResult && searchResult.map((result =>   
                              result["media_type"] === "person" ? (<option >{result.name}</option>) : (console.log("type: ",result.media_type))  
                              
                               ))}
                               
                            </select>

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
