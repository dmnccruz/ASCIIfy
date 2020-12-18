import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, Button, Icon } from 'semantic-ui-react'

const Bag = () => {    
    const [subtotal, setSubtotal] = useState(0);
    const [cartItems, setCartItems] = useState(0);
    
    useEffect(() => {
        let initSubtotal = 0;

        if(localStorage.getItem('cart') !== null) {
            setCartItems(JSON.parse(localStorage.getItem('cart')).length)

            JSON.parse(localStorage.getItem('cart')).map(i => {
                return (
                    initSubtotal += parseFloat(i.price.split("$")[1])
                )
            })
            setSubtotal(initSubtotal)
        }

    }, [])

    const deleteItem = (id) => {
        var cartArr = JSON.parse(localStorage.getItem('cart'))
        cartArr.splice(cartArr.findIndex(function(i){
            return i.id === id;
        }), 1)

        localStorage.setItem('cart', JSON.stringify(cartArr))
        setCartItems(cartItems - 1)
    }

    const checkout = () => {
        localStorage.removeItem('cart')
        setCartItems(0)
    }

    return (
        <div className="bag-container">
            <Navbar />
            <div className="bag-wrapper">
                <div className="bag-cart">
                    {localStorage.getItem('cart') === null || JSON.parse(localStorage.getItem('cart')).length === 0 ? 
                        <>
                            <h1>You have no orders.</h1>
                            <h2>(╯°o°）╯︵ ┻━┻</h2>
                        </>
                    :
                    <>
                        <h1>Your Cart</h1>
                        <Table celled inverted selectable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign='center'>ASCII</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>ID - Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Size</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='right'>Price</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {JSON.parse(localStorage.getItem('cart')).map(i => {
                                    return (
                                        <Table.Row key={i.id}>
                                            <Table.Cell style={{fontSize: i.size}} textAlign='center'>{i.content}</Table.Cell>
                                            <Table.Cell textAlign='center'>{i.id} - {i.name}</Table.Cell>
                                            <Table.Cell textAlign='center'>{i.size}</Table.Cell>
                                            <Table.Cell textAlign='right'>{i.price}</Table.Cell>
                                            <Table.Cell textAlign='center' ><Button color='red' onClick={(e) => deleteItem(i.id)}><Icon name="trash" /></Button></Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                                        <Table.Row style={{fontSize: '20px'}}>
                                            <Table.Cell  colSpan='3' textAlign='right'>Subtotal:</Table.Cell>
                                            <Table.Cell textAlign='right'>${subtotal}</Table.Cell>
                                            <Table.Cell textAlign='center'><Button color='yellow' onClick={() => checkout()}>Checkout</Button></Table.Cell>
                                        </Table.Row>
                            </Table.Body>
                        </Table>
                    </>
                }
                </div>
            </div>
        </div>
    )
}

export default Bag;