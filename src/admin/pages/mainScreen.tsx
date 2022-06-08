import { Grid } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddCardIcon from '@mui/icons-material/AddCard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WorkIcon from '@mui/icons-material/Work';

const MainScreen:React.FC = ()=>{
    return(
       <div className="main-screen">
           <h1 className="admin-title">Admin Panel</h1>
           <Grid container style={{display:"flex",justifyContent:'space-between'}}>
               <Grid item xs={10} md={4}>
                    <Link to='/admin/categories' className="main-screen-link-box">
                        <CategoryIcon style={{fontSize:'50px'}}/>
                        <h2>Categories</h2>
                    </Link>
               </Grid>
               <Grid item xs={10} md={4}>
                    <Link to='/admin/products' className="main-screen-link-box">
                        <FastfoodIcon style={{fontSize:'50px'}}/>
                        <h2>Products</h2>
                    </Link>
               </Grid>
               <Grid item xs={10} md={4}>
                    <Link to='/admin/orders' className="main-screen-link-box">
                        <AddCardIcon style={{fontSize:'50px'}}/>
                        <h2>Orders</h2>
                    </Link>
               </Grid>
               <Grid item xs={10} md={4}>
                    <Link to='/admin/restaurants' className="main-screen-link-box">
                        <RestaurantIcon style={{fontSize:'50px'}}/>
                        <h2>Restaurants</h2>
                    </Link>
               </Grid>
               <Grid item xs={10} md={4}>
                    <Link to='/admin/jobs' className="main-screen-link-box">
                        <WorkIcon style={{fontSize:'50px'}}/>
                        <h2>Jobs</h2>
                    </Link>
               </Grid>
           </Grid>
       </div>
    )
}

export default MainScreen;