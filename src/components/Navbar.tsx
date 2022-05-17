import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

type Props={
    setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:React.FC<Props> = ({setMenuOpen}) => {
    return ( 
        <div className="navbar">
            <div className="menu-item">
                <MenuIcon fontSize='large' onClick={()=>setMenuOpen(true)}/>
            </div>
            <div className="nav-logo">
                <NavLink to='/'>
                    <img src="./images/cupcake-logo.png" alt="logo" width="100px" />
                </NavLink>
            </div>
            <div className="nav-links">
                <NavLink className="login-btn" to='/login'>Login</NavLink>
            </div>
        </div>
     );
}
 
export default Navbar;