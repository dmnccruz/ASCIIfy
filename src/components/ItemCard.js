import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';

const ItemCard = ({ id, name, content, size, date, price, sold }) => {
    const [ liked, setLiked ] = useState(false);
    const [ added, setAdded ] = useState(false);
    const dateLastWeek = moment(new Date()).subtract(7, 'days');

    const handleLike = () => {
        if(localStorage.getItem('likes') === null) {
            localStorage.setItem('likes', JSON.stringify([]))
            let likes = JSON.parse(localStorage.getItem('likes'));
            likes.push({"id": id, "name": name, "content": content, "size": size, "date": date, "price": price, "sold": sold})
            localStorage.setItem('likes', JSON.stringify(likes))
        }
        else {
            let likes = JSON.parse(localStorage.getItem('likes'));
            likes.push({"id": id, "name": name, "content": content, "size": size, "date": date, "price": price, "sold": sold})
            localStorage.setItem('likes', JSON.stringify(likes))
        }
    }
    
    const handleUnlike = () => {
        var likeArr = JSON.parse(localStorage.getItem('likes'))
        likeArr.splice(likeArr.findIndex(function(i){
            return i.id === id;
        }), 1)

        localStorage.setItem('likes', JSON.stringify(likeArr))
    }

    const addToCart = () => {
        if(localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([]))
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.push({"id": id, "name": name, "content": content, "size": size, "date": date, "price": price, "sold": sold})
            localStorage.setItem('cart', JSON.stringify(cart))
            setAdded(!added)
        }
        else {
            let cart = JSON.parse(localStorage.getItem('cart'));

            if(cart.filter(i => i.id === id).length === 0) {
                cart.push({"id": id, "name": name, "content": content, "size": size, "date": date, "price": price, "sold": sold})
                localStorage.setItem('cart', JSON.stringify(cart))
                setAdded(!added)
            }
        }
    }

    return (
        <div className="item-product" data-name={name}>
            <div className="item-card">
                <div className="card-ascii">
                        <div className="card-like" onClick={() => setLiked(!liked)}>
                            {JSON.parse(localStorage.getItem('likes')) && JSON.parse(localStorage.getItem('likes')).filter(like => like.id === id).length !== 0 ? 
                            <Icon name='heart' size='large'color='red' onClick={() => handleUnlike()}/>
                            :
                            <Icon name='heart outline' size='large' onClick={() => handleLike()}/>
                            }
                        </div>
                        <div className="card-content" style={{fontSize: size}}>{content}</div>
                        <h5>{sold} bought</h5>
                    </div>
                <div className="card-info">
                    <div className="card-details">
                        <h2>{name}</h2>
                        <h5>Size: {size}</h5>
                        <h5>Face ID: {id}</h5>
                        {moment(date).isAfter(dateLastWeek) ? 
                            <h5 className="card-date">{moment(date).fromNow(true)} ago</h5>
                            :
                            <h5 className="card-date">{moment(date).calendar()}</h5>
                        }
                    </div>
                    <div className="card-price">
                        {JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).filter(i => i.id === id).length !== 0 ? 
                            <Icon className="add-to-cart-button" name='shopping cart' size='large' style={{opacity: '.15'}}/>
                            :
                            <Icon className="add-to-cart-button" name='shopping cart' size='large' onClick={() => addToCart()}/>  
                        }      
                        <p>{price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;