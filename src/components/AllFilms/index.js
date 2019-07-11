import React from "react";
import axios from "axios";

import Nav from '../Nav';

function AllFilms() {
    return (
        <>
            <div className="container">
                <Nav />
                <div className="content" style={{ padding: "20px", backgroundColor: "#A9A9A9" }}>
                    <h2>Tous les films</h2>
                </div>
            </div>
        </>
    )
}

export default AllFilms;