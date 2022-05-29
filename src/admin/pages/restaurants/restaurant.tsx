import React from 'react'
import { Link } from 'react-router-dom';

const RestaurantAdmin:React.FC = ()=>{
    return (
        <div className="admin-content">
            <Link to='/admin/restaurants/new-restaurant'>New</Link>
            <h1>restaurant Admin</h1>

        </div>
    )
}


export default RestaurantAdmin;