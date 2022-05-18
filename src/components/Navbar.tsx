import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from 'react-redux';

type Props={
    setMenuOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar:React.FC<Props> = ({setMenuOpen}) => {

    const {currentUser} = useSelector((state:any) =>state.usersReducer);


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
            {currentUser ?
                <div className="nav-links">
                    <img src={currentUser.image} width="50px" alt="user image" style={{borderRadius:'50%'}} />
                </div>
                :
                <div className="nav-links">
                    <NavLink className="login-btn" to='/login'>Login</NavLink>
                </div>
            }
        </div>
     );
}
 
export default Navbar;