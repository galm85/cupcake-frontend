import { Grid } from '@mui/material';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import RestaurantCard from '../components/cards/restaurantCard';
import { getAllRestaurants } from '../redux/actions/restaurants.actions';
import { Restaurant, State } from '../utils/types';


const breadLinks:BreadCrumbsLink[] = [
    {
        label:'Home',
        link:'/',
    }
]


const RestaurantsPage:React.FC = () => {


    const dispatch:any = useDispatch();
    const restaurants:Restaurant[] = useSelector((state:State)=>state.restaurantsReducer.restaurants)

    React.useEffect(()=>{
        dispatch(getAllRestaurants());
    },[])

    return(
        <div className="restaurant-page">

            <BreadCrumbs currentPage='Restaurant' links={breadLinks} />

            <h1 style={{paddingTop:'50px'}} className="page-title">Our Restaurants</h1>

            <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                {restaurants && restaurants.map(restaurant=>(
                    <Grid item xs={12} md={5} key={restaurant._id}>
                        <RestaurantCard restaurant={restaurant}/>

                    </Grid>
                ))}
            </Grid>

        </div>
    )

}


export default RestaurantsPage;