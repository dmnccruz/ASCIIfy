import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard'

const Likes = () => {    
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        if(localStorage.getItem('likes') !== null) {
            setItems(JSON.parse(localStorage.getItem('likes')))
        }
    }, [])

    return (
        <div className="like-wrapper">
            <Navbar />
            {
                JSON.parse(localStorage.getItem('likes')).length > 0 ?
                <h1 style={{marginTop: '100px'}}>Your likes</h1>
                :
                null
            }

            <div className="likes-container" style={{marginBottom: "600px"}}>
            {localStorage.getItem('likes') === null || JSON.parse(localStorage.getItem('likes')).length === 0 ? 
                        <div className="nolikes-container">
                            <h1 style={{marginBottom: '350px'}}>You have no likes.</h1>
                            <h2>(;´༎ຶД༎ຶ`)</h2>
                        </div>
                    :
                    <div className="like-container">
                        {items && items.map(item => {
                            return (
                                <ItemCard 
                                    key={item.id} 
                                    id={item.id}
                                    name={item.name}
                                    content={item.content}
                                    size={item.size}
                                    date={item.date}
                                    price={item.price}
                                    sold={item.sold}                                            
                                />
                            )
                        })}
                    </div>
                }
            
            </div>
            <div className="backdrop"></div>
        </div>
    )
}

export default Likes;