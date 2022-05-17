import { Divider } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

// icons
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import CakeIcon from '@mui/icons-material/Cake';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';


const Sidenav:React.FC = ()=>{

    return(
        <div className="sidenav">
            <div className="sidenav-header">
                <img src="./images/cupcake-logo.png" width='100px' alt="logo" />
                <h2>The CupCake Factory</h2>
            </div>
            <Divider style={{margin:'20px 0'}}/>
            <div className="sidenav-links">
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/'><HomeIcon style={{marginRight:'20px'}}/> Home</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/cupcakes'><CakeIcon style={{marginRight:'20px'}}/>Our Cupcaks</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/menu'><MenuBookIcon style={{marginRight:'20px'}}/>Menu</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/about-us'><InfoIcon style={{marginRight:'20px'}}/>About Us</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/restourants'><StoreIcon style={{marginRight:'20px'}}/>Restaurants</NavLink>
            </div>
            <Divider style={{margin:'20px 0'}}/>
            <div className="sidenav-links">
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/profile'><AccountCircleIcon style={{marginRight:'20px'}}/>My Account</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/logout'><LogoutIcon style={{marginRight:'20px'}}/> Logout</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/login'><LoginIcon style={{marginRight:'20px'}}/> Login</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/jobs'><WorkIcon style={{marginRight:'20px'}}/> Jobs</NavLink>
            </div>

        </div>
    )
}


export default Sidenav;