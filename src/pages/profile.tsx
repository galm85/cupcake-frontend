import { Divider, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentOrder, State, User } from '../utils/types';


const ProfilePage:React.FC = ()=>{

    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    const {currentOrder,totalPriceCurrentOrder} = useSelector((state:State)=>state.ordersReducer);

    return (
        <div className="profile-page">

            <Grid container className="user-data">
                <Grid item xs={12} md={4} className="user-image">
                    <img src={user.image}  alt={user.firstName} />
                </Grid>
                <Grid item xs={12} md={8} className="user-details">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <h4>{user.email}</h4>
                </Grid>
            </Grid>

            <Divider/>

            <Grid container>
                <h3>My Order</h3>
                {currentOrder && currentOrder.map((order:CurrentOrder)=>(
                    <div key={order._id}>
                        <img src={order.image} width="50px" alt={order.title} />
                        <p>${order.price} x ${order.amount} = ${order.price*order.amount}</p>
                    </div>
                ))}
                <h3>Total: ${totalPriceCurrentOrder}</h3>
            </Grid>

            <Grid container>
                <Grid item xs={12}>
                    <h3>Orders History</h3>
                </Grid>
            </Grid>
        </div>
    )
}


export default ProfilePage;