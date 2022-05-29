import React from 'react'
import { NavLink } from 'react-router-dom';




const DashboardNav:React.FC = ()=> {
    return (
        <div className="dashboard-nav">
            <NavLink to='/admin' className="dashboard-link">Dashboard</NavLink>
            <NavLink to='/admin/categories' className={(navdata)=>navdata.isActive ? "dashboard-link dashboard-link-active" : "dashboard-link"}>Categories</NavLink>
            <NavLink to='/admin/products' className={(navdata)=>navdata.isActive ? "dashboard-link dashboard-link-active" : "dashboard-link"}>Products</NavLink>
            <NavLink to='/admin/orders' className={(navdata)=>navdata.isActive ? "dashboard-link dashboard-link-active" : "dashboard-link"}>Orders</NavLink>
            <NavLink to='/admin/restaurants' className={(navdata)=>navdata.isActive ? "dashboard-link dashboard-link-active" : "dashboard-link"}>Restaurants</NavLink>
        </div>
    )
}



export default DashboardNav;

