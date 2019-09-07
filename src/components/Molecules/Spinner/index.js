import React from "react";

import "../../../App.css";

function Spinner() {
  return (
    <div
      className="spinner-container"
      style={{ display: "flex", justifyContent: "center", flex: "1" }}
    >
      <div class="preloader-wrapper active">
        <div class="spinner-layer">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
