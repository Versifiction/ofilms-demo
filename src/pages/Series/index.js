import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import '../../App.css';
import Nav from '../../components/Nav';

function Series() {
    useEffect(() => {
        document.title = "O'Films | Séries";
    })

    return (
        <>
            <Nav />
            <div style={{ textAlign: "center" }}>
                <p style={{ paddingTop: "50px" }}>Bienvenue sur la page des Séries</p>
                <p style={{ paddingTop: "100px" }}>Pour l'instant, vous pouvez :</p>
                <ul>
                    <li class="nav-item">
                        <Link href="/series/all" to="/series/all">Toutes les séries</Link>
                    </li>
                    <li class="nav-item">
                        <Link href="/series/populaires" to="/series/populaires">Les séries les mieux notés</Link>
                    </li>
                </ul>
                </div>
        </>
    )
}

export default Series;