import { Divider } from '@mui/material';
import React from 'react'
import { CurrentOrder, Order } from '../../utils/types';


type Props = {
    order:Order;
}


const OrderCard:React.FC<Props> = ({order})=>{

    const [items,setItems] = React.useState<CurrentOrder[]>([]);


    React.useEffect(()=>{
        setItems(JSON.parse(order.items));
    },[])
    
    return (
        
        <div className="order-card" key={order._id}>
            <div className="order-card-information">
                <p><b>Order Id: </b>{order._id}</p>
                <p><b>Date: </b>{new Date(order.createdAt).toDateString()}</p>
                <p><b>Address: </b>{order.address + ", "+order.city }</p>
                <p><b>Contact: </b>{order.contactPerson}</p>
                <p><b>Payment Method: </b>{order.paymentMethod}</p>
            </div>
            <div className="order-card-items">
                {items && items.map((item:CurrentOrder)=>(
                    <div className="order-card-item" key={item._id}>
                        <p><b>{item.title}</b> {' | '}   ${item.price} X {item.amount} = ${item.amount*item.price}</p>
                    </div>
                ))}
                <Divider/>
                <h3 style={{textAlign:'right'}}>Total: ${order.totalAmount}</h3>
            </div>
            <div className="order-card-status">
                {order.status}
            </div>
        </div>
    )
}


export default OrderCard;