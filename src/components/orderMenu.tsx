import { Button, Divider, Grid } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CurrentOrder, State, User } from '../utils/types';

const OrderMenu:React.FC = ()=>{

    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    const {currentOrder,totalPriceCurrentOrder} = useSelector((state:State)=>state.ordersReducer);


    return(
        <div className="order-menu">
            
            <h1>My Order</h1>
            <Divider style={{margin:'20px 0'}}/>
                {currentOrder.length > 0 ? 
                    <div className="order-container">
                        {currentOrder.map((order:CurrentOrder)=>(
                          
                               <div key={order._id}>
                                <div  className="order-item">
                                    <img src={order.image}  alt={order.title} />
                                    <div className="order-price">
                                        <p>{order.title}</p>
                                        <p>${order.price} X {order.amount} = <b> ${(order.amount * order.price).toFixed(2)}</b></p>
                                    </div>
                                    <div className="order-actions">
                                        <span>+</span>
                                        <span>-</span>
                                    </div>
                                </div>
                                    <Divider />
                            
                               </div>
                            
                        ))}

                        <div className="order-total">
                            <h2>Total: ${totalPriceCurrentOrder}</h2>
                        </div>
                        <div className="checkout">
                          <Link  to='/checkout' style={{width:'100%',textDecoration:'none'}}>
                            <Button  variant='contained' color="warning" fullWidth>Checkout</Button>
                          </Link>  
                        </div>
                    </div>
                    :
                    <p>
                        Order is empty
                    </p>
            }

        </div>
    )
}

export default OrderMenu;