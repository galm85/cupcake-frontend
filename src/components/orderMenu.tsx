import { Button, Divider, Grid } from '@mui/material';
import * as React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CurrentOrder, State, User } from '../utils/types';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { removeItemFromCurrentOrder, updateAmountOfCurrentOrder } from '../redux/actions/orders.actions';



type Props = {
    setOrderOpen:React.Dispatch<React.SetStateAction<boolean>>
    

}

const OrderMenu:React.FC<Props> = ({setOrderOpen})=>{

    const dispatch:any = useDispatch();
    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    const {currentOrder,totalPriceCurrentOrder} = useSelector((state:State)=>state.ordersReducer);


    const handleAmount = (op:string,itemId:string):void=>{
        dispatch(updateAmountOfCurrentOrder(op,itemId,user._id));
       
    }

    return(
        <div className="order-menu">
            
            <h1>My Order</h1>
            <Divider style={{margin:'20px 0'}}/>
                {currentOrder &&  currentOrder.length > 0 ? 
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
                                        <span onClick={()=>handleAmount('+',order._id)}>+</span>
                                        <span onClick={()=>handleAmount('-',order._id)}>-</span>
                                    </div>
                                </div>
                                <div style={{textAlign:"center"}}>
                                    <Button color="error" onClick={()=>dispatch(removeItemFromCurrentOrder(order._id,user._id))}>Remove Item</Button>
                                </div>
                                <Divider />
                            
                               </div>
                            
                        ))}

                        <div className="order-total">
                            <h2>Total: ${totalPriceCurrentOrder}</h2>
                        </div>
                        <div className="checkout">
                          <Link onClick={()=>setOrderOpen(false)}  to='/checkout' style={{width:'100%',textDecoration:'none'}}>
                            <Button  variant='contained' color="warning" fullWidth>Checkout</Button>
                          </Link>  
                        </div>
                    </div>
                    :
                    <div className="order-container-empty">
                        <ShoppingBasketIcon className="empty-order-icon"/>
                        <h2>No Items in your order yet</h2>
                    </div>
                    
            }

        </div>
    )
}

export default OrderMenu;