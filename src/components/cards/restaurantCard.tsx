import { Divider } from '@mui/material';
import React from 'react'
import { Restaurant } from '../../utils/types'


type Props = {
    restaurant:Restaurant;
}


const RestaurantCard:React.FC<Props> = ({restaurant})=>{
    return(
       <div className="restaurant-card">
           <img src={restaurant.image} alt={restaurant.city + ' restaurant'} />
           <div className="restaurant-card-data">
               <div className="restaurant-card-details">
                    <h3>{restaurant.city}</h3>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.phone}</p>
                    <p><b>Events : </b> {restaurant.events ? 'Yes' : 'No'} </p>
               </div>
               <div className="restaurant-page-opening">
                    <h4>Opening</h4>
                    <p><b>Sun-Thu : </b>{restaurant.weekdayOpen} - {restaurant.weekdayClose}</p>
                    {restaurant.friOpen!== 'undefined' ?  <p><b>Friday : </b>{restaurant.friOpen} - {restaurant.friClose}</p> : <p><b>Friday : </b>Close</p>}
                    {restaurant.satOpen!== 'undefined' ?  <p><b>Sat : </b>{restaurant.satOpen} - {restaurant.satClose}</p> : <p><b>Saterday : </b>Close</p>}
               </div> 
           </div>
       </div>
    )
}


export default RestaurantCard;