import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';

export default function Landing() {

    return (
        <div className="landing">
            <div className="landingContainer">
                <div className="text">
                    <h1 className="title">FOOD APP</h1>
                    <h2 className="subtitle">CREATE YOUR OWN RECIPE</h2>
                </div>
                <div className="buttonContainer" >
                    <Link to='/home'>
                        <button id="ingresar" >HOME</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}