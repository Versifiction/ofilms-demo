import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import '../../App.css';
import Nav from '../../components/Nav';

function Inscription() {
    useEffect(() => {
        document.title = "O'Ciné | Inscription";
    })

    return (
        <>
            <Nav />
            <div style={{ textAlign: "center" }}>
                <p>Page inscription</p>
            </div>
        </>
    )
}

export default Inscription;