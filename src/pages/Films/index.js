import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import '../../App.css';
import Nav from '../../components/Nav';

function Films() {
    useEffect(() => {
        document.title = "O'Ciné | Films";
    })

    return (
        <>
            <Nav />
            <div style={{ textAlign: "center" }}>
                <p style={{ paddingTop: "50px" }}>Bienvenue sur la page des Films</p>
                <p style={{ paddingTop: "100px" }}>Pour l'instant, vous pouvez :</p>
                <ul>
                    <li class="nav-item">
                        <Link href="/films/all" to="/films/all">Tous les films</Link>
                    </li>
                    <li class="nav-item">
                        <Link href="/films/populaires" to="/films/populaires">Les films les mieux notés</Link>
                    </li>
                </ul>
                </div>
        </>
    )
}

export default Films;