import React from 'react';

const Footer = () => {
    const path = window.location.pathname;
    return (
        path !== "/" ? 
            document.getElementsByClassName('item-product').length < 8 && window.location.pathname.split("/")[1] === "shop" ?
            <div className="footer-container big">
                <div className="footer">
                <h2>ASCIIfy | express yourself.</h2>
                <p>dominicmartincruz@gmail.com</p>
                </div>
            </div>
            :
            <div className="footer-container">
                <div className="footer">
                <h2>ASCIIfy | express yourself.</h2>
                <p>dominicmartincruz@gmail.com</p>
                </div>
            </div>
        :
        null
    )
}

export default Footer;