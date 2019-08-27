import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from '../Nav';


function afficheCountries ({match}) {

    const [countryName, setCountryName] = false;     
    const [countryIsoCode , setCountryIsoCode] = false;
    const countryIsoCodeUrl = `https://api.themoviedb.org/3/configuration/countries/${match.params.iso_3166_1}?api_key=${process.env.REACT_APP_API_KEY}`;
    const countryNameUrl = `https://api.themoviedb.org/3/configuration/countries/${match.params.english_name}?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        document.title = `O'Films | Les pays`;
        loadAfficheCountry();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`
        }
    }, []);



    async function loadAfficheCountry () {

        try {

            const dataCountryName = await axios.get(countryNameUrl);
            const dataCountryIsoCode = await axios.get(countryIsoCodeUrl);
            console.log("Pays : ", countryName);
            console.log("Code iso : ", countryIsoCode);
            
            setCountryName(dataCountryName.data.english_name);
            setCountryIsoCode (dataCountryIsoCode.data.iso_3166_1);
            
          }
         catch (error) {
             console.error (error);
            }

    };

    return (
        <>
        <Nav />
        <div style={{ textAlign: "center" }}>

            <h2>Liste des pays: </h2>
                <p>
                    <ul>
                        <li>{countryName}</li>
                        <li>{countryIsoCode}</li>
                    </ul>
                </p>
            
            

        </div>
        </>
    )

}

export default afficheCountries;