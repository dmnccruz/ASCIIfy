import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Navbar = (props) => {
    const [showSearch, setShowSearch] = useState(true)
    const [cartItems, setCartItems] = useState(0)
    const shopPathname = "/shop"

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('cart'))) {
            setCartItems(JSON.parse(localStorage.getItem('cart')).length)
        }
    }, [])

    return (
        <div className="navbar-container">
            <div className="navbar-buttons-container">
                <div className="navbar-header">
                    <Link to="/shop/id">ASCIIfy</Link>
                </div>
                {
                    window.location.pathname === shopPathname 
                    ? 
                    <div className="navbar-search">
                        <Icon id="search-button" onClick={() => setShowSearch(!showSearch)} name='search' size='small' />
                        <div className="search-container">
                            <input className={showSearch ? null : "shownav"} placeholder="search"/>
                        </div>
                    </div>
                    : 
                    null
                }
                <div className="navbar-buttons">
                    <div id="bag-button-container">
                        {JSON.parse(localStorage.getItem('cart')) ? <span style={{background: 'maroon', color: 'white', border: 'none'}}>{cartItems}</span>
                        :
                        <span>0</span>
                        }
                        <Link to="/bag" id="bag-button"><Icon name='shopping bag' size='large' /></Link>
                    </div>
                    <Link to="/likes" id="like-button"><Icon name='heart outline' size='large' /></Link>
                    <Link to="/" id="login-button"><Icon name='user outline' size='large' /></Link>
                </div>
            </div>
        </div>
    )
};

export default Navbar;

