import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react'
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from '../components/ItemCard'
import AdCard from '../components/AdCard'

const ItemsGroup = () => {
    const [items, setItems] = useState([]);
    const [itemsQty, setItemsQty] = useState(0);
    const [nextItems, setNextItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [ads, setAds] = useState([]);
    const [sorter, setSorter] = useState(window.location.pathname.split("/")[2]);
    const [showSearch, setShowSearch] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const editSearchTerm = (e) => {
        setSearchTerm(e.target.value)
        if(e.target.value === "") {
            ads.map(ad => {
                ad.isHidden = false
            })
            items.map(item => {
                item.isHidden = false
            })
        }
        else {
            items.map(item => {
                item.isHidden = false
    
                if(item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                }
                else {
                     item.isHidden = true
                }
            })

            ads.map(ad => {
                ad.isHidden = true
            })
        }
    }

    useEffect(()=>{
        getItems()
        constGetAds()
    },[itemsQty]) 

    const handleChange = (e) => {
        setSorter(e.target.value)
        window.location.href = `/shop/${e.target.value}`
    }

    const getItems = async () => {
        try {
            const response = await axios.get('/items.json');
            setItemsQty(response.data.length)

            function sortArr(keyName, num) {
                var order = num;
                if(keyName[0] === "-") {
                    order = -1;
                    keyName = keyName.substr(1);
                }
                return function (a,b) {
                    var result = (a[keyName] < b[keyName]) ? -1 : (a[keyName] > b[keyName]) ? 1 : 0;
                    return result * order;
                }
            }

            if(window.location.pathname.split("/")[2] === 'priceasc') {
                var newRes = response.data.sort(sortArr("price", 1))
            }
            else if(window.location.pathname.split("/")[2] === 'pricedesc') {
                var newRes = response.data.sort(sortArr("price", -1))
            }
            else if(window.location.pathname.split("/")[2] === 'sizedesc') {
                var newRes = response.data.sort(sortArr('size', -1))
            }
            else if(window.location.pathname.split("/")[2] === 'sizeasc') {
                var newRes = response.data.sort(sortArr('size', 1))
            }
            else if(window.location.pathname.split("/")[2] === 'best') {
                var newRes = response.data.sort(sortArr("sold", -1))
            }
            else if(window.location.pathname.split("/")[2] === 'date') {
                var newRes = response.data.sort(sortArr("date", -1))
            }
            else {
                var newRes = response.data.sort(sortArr(window.location.pathname.split("/")[2], 1))
            }

            if(nextItems.length === 0) {
                if(itemsQty > 0 && items.length === itemsQty) {
                    setHasMore(false)
                    return 
                }
                setTimeout(function(){ 
                    setItems(items.concat(newRes.slice(items.length, items.length + 15).map(el => {
                        return el
                    })))
                    setNextItems(newRes.slice(items.length + 15, items.length + 30).map(el => {
                        return el
                    })) 
                }, 750);
            }
            else {
                if(itemsQty > 0 && items.length === itemsQty) {
                    setHasMore(false)
                    return 
                }
                setTimeout(function(){ 
                    setItems(items.concat(nextItems.map(el => {
                        return el
                    })))
                    setNextItems([])
                }, 750);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const constGetAds = async () => {
        try {
            const response = await axios.get('/advertisements.json');
            var n = Math.floor(itemsQty / 20)
            const newArr = Array.from(Array(n).keys())
            const randomAds = response.data.sort(() => 0.5 - Math.random());
            var adArr = []

            newArr.map((el, index) => {
                return adArr.push(randomAds[index])
            })

            setAds(ads.concat(adArr))
        } catch (err) {
            console.error(err);
        }
    }
 
    return (
        <>
            <div className="items-actions">
                <div className="actions-container">
                    <div className="navbar-search">
                        <h3>Search</h3>
                        <Icon id="search-button" onClick={() => setShowSearch(!showSearch)} name='search' size='small' />
                        <div className="search-container">
                            <input className={showSearch ? null : "shownav"} value={searchTerm} onChange={(e) => editSearchTerm(e)}/>
                        </div>
                    </div>
                    <div className="sorter-container">
                        <h3>Sort</h3>
                        <select className="sorter" name="cars" id="cars" value={sorter} onChange={(e) => handleChange(e)}>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="date">Newest</option>
                            <option value="best">Best Selling</option>
                            <option value="priceasc">Lowest Price</option>
                            <option value="pricedesc">Highest Price</option>
                            <option value="sizeasc">Smallest</option>
                            <option value="sizedesc">Biggest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="items-container">
                {items.length === 0 ?
                    <div className="loading-icon"><Icon loading name='spinner' /> Loading Faces ( ͡~ ͜ʖ ͡°)...</div>
                    :
                    <InfiniteScroll
                        className="items-group"
                        dataLength={items.length}
                        next={getItems}
                        hasMore={hasMore}
                        loader={<h4 className="loading-infinite"><Icon loading name='spinner' /> Loading more faces (⩾﹏⩽)...</h4>}
                        endMessage={<h4 className="loading-infinite">End of Catalogue ( ͡° ͜ʖ ͡°)</h4>}
                        >
                        {document.getElementsByClassName('item-product').length === 0 ?
                            <div className="search-not-found">Face not found (ᗒᗣᗕ)՞</div>
                            :
                            null
                        }
                        {items && items.map((item, index) => {
                            if(index % 20 === 0 && index !== 0) {
                                return (
                                    <React.Fragment key={Math.floor(Math.random() * 1000000) + 1}>
                                        {ads[(index/20) -1].isHidden ? null : 
                                            <AdCard content={ads[(index/20) -1].content}/>                                   
                                        }
                                        {item.isHidden ? null : 
                                        <ItemCard 
                                            key={item._id} 
                                            id={item._id}
                                            name={item.name}
                                            content={item.content}
                                            size={item.size}
                                            date={item.date}
                                            price={item.price}
                                            sold={item.sold}                                            
                                        />}
                                    </React.Fragment>
                                )
                            }
                            else {
                                return (
                                    item.isHidden ? null : 
                                    <ItemCard 
                                        key={item._id} 
                                        id={item._id}
                                        name={item.name}
                                        content={item.content}
                                        size={item.size}
                                        date={item.date}
                                        price={item.price}
                                        sold={item.sold}
                                        
                                    />
                                )
                            }

                        })}
                    </InfiniteScroll>                  
                }
            </div>
        </>
    )
} 

export default ItemsGroup;