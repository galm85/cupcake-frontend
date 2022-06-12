import { Divider, Grid, Table, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import BreadCrumbs from '../components/Breadcrumbs';
import OrderCard from '../components/cards/orderCard';
import { getAllOrdersPerUser } from '../redux/actions/orders.actions';
import { CurrentOrder, State, User } from '../utils/types';
import {Order} from '../utils/types';
import {useNavigate} from 'react-router-dom';


const ProfilePage:React.FC = ()=>{

    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    const {currentOrder,totalPriceCurrentOrder,ordersHistory} = useSelector((state:State)=>state.ordersReducer);

    React.useEffect(()=>{
        if(user){
            dispatch(getAllOrdersPerUser(user._id));
        }else{
            navigate('/login');
        }
    },[])



    return (
        <div className="profile-page">
            {user && <>
        
            <BreadCrumbs currentPage='My Account' links={[{label:'Home',link:'/'}]}/>
            <Grid container className="user-data">
                <Grid item xs={12} md={4} className="user-image">
                    <img src={user.image}  alt={user.firstName} />
                </Grid>
                <Grid item xs={12} md={8} className="user-details">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <h4>{user.email}</h4>
                </Grid>
            </Grid>

            <Divider/>

            <Grid container>
                <Grid item xs={12}>
                    <h2>Orders History</h2>
                    <Grid container style={{display:'flex',justifyContent:'center'}}>
                    {ordersHistory && ordersHistory.map((order:Order)=>(
                        <Grid item xs={10} key={order._id}>
                            <OrderCard  order={order}/>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            </>}
        </div>
    )
}


export default ProfilePage;