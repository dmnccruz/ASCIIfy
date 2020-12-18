import React from 'react';
import { Link } from 'react-router-dom';
import LandingFaces from '../components/LandingFaces';

const Landing = () => {  
    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1>ASCIIfy</h1>
                <h6>express yourself.</h6>
            </div>
            <LandingFaces />
            <div className="landing-buttons-container">
                <Link to="/shop/date">Shop now.</Link>
            </div>
        </div>
    )
}

export default Landing;