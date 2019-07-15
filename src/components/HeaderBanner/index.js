import React from "react";
import { Link } from 'react-router-dom';

import '../../App.css';
import AccueilBanner from '../../images/bg-header.jpg';

function Nav() {
    const style = {
        backgroundImage: "url("+ AccueilBanner +")", 
        width: "100%", 
        height: "100vh",
        position: "relative"
    }

    return (
        <div className="accueil-banniere" style={ style }>
            <h1 className="accueil-title">O'Films</h1>
            <p className="accueil-text">Les meilleurs films. Les meilleures séries.</p>
            <Link href="/inscription" to="/inscription" className="btn btn-primary">S'inscrire</Link>
            <i class="fas fa-angle-double-down fa-2x"></i>
        </div>
    )
}

export default Nav;