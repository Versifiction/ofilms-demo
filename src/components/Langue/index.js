import React, { useEffect, useState } from 'react';
import axios from "axios";
//import Nav from '../Nav';
import Spinner from '../Molecules/Spinner';
import useForceUpdate from 'use-force-update';

const Langue = () => {
  const [languages, setLanguages] = useState(false);
  const URL = `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}`;
  const forceUpdate = useForceUpdate();
  const [pending, setPending] = useState(true);
  console.log(" url: ", URL);


  useEffect(() => {
    getLanguages();
    console.log("effect use");
    return () => {
     
      document.body.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/black-linen.png")`;
    }
}, []);


  async function getLanguages() {
    try {
        const languages = await axios.get(URL);
        setLanguages(languages.data);
        setPending(false);
        console.log("langages: ", languages);
        forceUpdate();
    } catch (error) {
        console.error(error);
    }
  };
return ( <>
            
              <div >
                <h3 className="langue">Liste des langues  </h3>
                  {pending ? <Spinner /> : languages && languages.map((language) => ( 
                    <p className="langue" >{language.english_name}</p>

                  ))}
              </div>

        </>
)};

export default Langue;
