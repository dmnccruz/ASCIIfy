import React from 'react';
import Navbar from '../components/Navbar';
import ItemsGroup from '../components/ItemsGroup'

const Shop = () => { 

    return (
        <div className="shop-container">
            <Navbar />
            <ItemsGroup/>
            <div className="backdrop"></div>
        </div>
    )
}

export default Shop;