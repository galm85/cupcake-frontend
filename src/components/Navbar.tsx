import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from 'react-redux';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchBar from './searchBar';
import { State } from '../utils/types';
import Loading from './Loading';
import Logo from '../assets/cupcake-logo.png';

type Props={
    setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
    setOrderOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:React.FC<Props> = ({setMenuOpen,setOrderOpen}) => {

    const {currentUser} = useSelector((state:State) =>state.usersReducer);
    const {loading} = useSelector((state:State)=>state.settingReducer);



    return ( 
        <div className="navbar">
            <div className="menu-item">
                <MenuIcon fontSize='large' onClick={()=>setMenuOpen(true)}/>
            </div>
            <div className="nav-logo">
                <NavLink to='/'>
                    <img src={Logo} alt="logo" width="95px" />
                </NavLink>
            <SearchBar />
            </div>
            {currentUser ?
            <>
                <div className="menu-item">
                    <ShoppingBasketIcon fontSize='large'   style={{marginRight:'20px'}} onClick={()=>setOrderOpen(true)}/>
                </div>
                <div className="nav-links">
                    <img src={currentUser.image} width="50px" alt="user image" style={{borderRadius:'50%'}} />
                </div>
                
            </>
                :
                <div className="nav-links">
                    <NavLink className="login-btn" to='/login'>Login</NavLink>
                </div>
            }
           
        </div>
     );
}
 
export default Navbar;