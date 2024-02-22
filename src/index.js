import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <App />
        {/* <StarRating max={5} color="#ffa534" size={24} />
        <StarRating max={10} color="#ffa534" size={20} /> */}
    </>
);
