import React from 'react';

const AdCard = ({ content }) => {
    return (
        <div className="advertisement" key={Math.floor(Math.random() * 1000000) + 1}>
            <p>advertisement:</p>
            <h1>{content}</h1>
            <div></div>
        </div>
    )
}

export default AdCard;