import { Divider } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MainState } from '../redux/store';

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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

type Props={
    setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
    
}

const Sidenav:React.FC<Props> = ({setMenuOpen})=>{

    const {currentUser} = useSelector((state:MainState)=>state.usersReducer);

  
    return(
        <div className="sidenav">
            <div className="sidenav-header">
                <img src="./images/cupcake-logo.png" width='100px' alt="logo" />
                <h2>The CupCake Factory</h2>
            </div>
          
            <Divider style={{margin:'20px 0'}}/>
            <div className="sidenav-links" onClick={()=>setMenuOpen(false)}>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/'><HomeIcon style={{marginRight:'20px'}}/> Home</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/cupcakes'><CakeIcon style={{marginRight:'20px'}}/>Our Cupcaks</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/menu'><MenuBookIcon style={{marginRight:'20px'}}/>Menu</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/about-us'><InfoIcon style={{marginRight:'20px'}}/>About Us</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/restaurants'><StoreIcon style={{marginRight:'20px'}}/>Restaurants</NavLink>
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/careers'><WorkIcon style={{marginRight:'20px'}}/> Careers</NavLink>
            </div>
            <Divider style={{margin:'20px 0'}}/>
            <div className="sidenav-links">
                {currentUser ? <>
                    {currentUser.isAdmin && <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/admin'><AdminPanelSettingsIcon style={{marginRight:'20px'}}/>Admin Panel</NavLink>}
                    <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/profile'><AccountCircleIcon style={{marginRight:'20px'}}/>My Account</NavLink>
                    <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='#' onClick={()=>{sessionStorage.removeItem('cupcake');window.location.href='./'}}><LogoutIcon style={{marginRight:'20px'}}/> Logout</NavLink>
                </>
                :
                <NavLink className={(navdata)=>navdata.isActive ? 'sidenav-link active': 'sidenav-link'} to='/login'><LoginIcon style={{marginRight:'20px'}}/> Login</NavLink>
                
                }
            </div>

        </div>
    )
}


export default Sidenav;