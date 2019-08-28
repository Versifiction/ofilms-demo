import axios from "axios";
import React, { useEffect} from "react";
import Nav from '../Nav';


function country () {

    const [countryName, setCountryName] = false;     
    const [countryIsoCode , setCountryIsoCode] = false;
    const countryIsoCodeUrl = `https://api.themoviedb.org/3/configuration/countries/?api_key=${process.env.REACT_APP_API_KEY}`;
    const countryNameUrl = `https://api.themoviedb.org/3/configuration/countries/?api_key=${process.env.REACT_APP_API_KEY}`;

    useEffect(() => {
        //document.title = `O'Films | Les pays`;
        loadCountry();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
        }
    }, []);



    async function loadCountry () {

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

    // un commentaire pr vérifier si mes commit sont ok :)
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

export default country;