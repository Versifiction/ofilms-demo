import React from "react";
import { Link } from 'react-router-dom';

import '../../../App.css';

function Spinner() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <i className="fas fa-spinner fa-spin fa-3x" style={{ color: "#cdad76" }}></i>
        </div>
    )
}

export default Spinner;