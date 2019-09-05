import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from '../Nav';
import useForceUpdate from 'use-force-update';
import Spinner from '../Molecules/Spinner';

function Country() {
    const [countries, setCountries] = useState(false);     
    const [pending, setPending] = useState(true);
    const countriesUrl = `https://api.themoviedb.org/3/configuration/countries?api_key=381e8c936f62f2ab614e9f29cad6630f&language=fr`;
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        document.title = `O'Films | Les pays`;
        loadCountry();

        return () => {
            document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
        }
    }, []);

    async function loadCountry() {
        try {
            const dataCountries = await axios.get(countriesUrl);
            console.log("Pays : ", dataCountries.data);
            setCountries(dataCountries.data);
            setPending(false);
            forceUpdate()
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
                    {pending ? <Spinner /> : countries && countries.map(country => (
                        <div key={country.iso_3166_1}>
                        <p>{country.english_name}</p>
                        <p>{country.iso_3166_1}</p>
                        </div>
                    ))}
        </div>
        </>
    )

}

export default Country;