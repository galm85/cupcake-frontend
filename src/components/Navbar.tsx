import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import SearchBar from './searchBar';
import { State } from '../utils/types';
import Logo from '../assets/cupcake-logo.png';

type Props = {
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NAV_LINKS = [
    { to: '/',           label: 'Home',        end: true  },
    { to: '/cupcakes',   label: 'Cupcakes',    end: false },
    { to: '/menu',       label: 'Menu',        end: false },
    { to: '/restaurants',label: 'Restaurants', end: false },
    { to: '/about-us',   label: 'About',       end: false },
];

const Navbar: React.FC<Props> = ({ setMenuOpen, setOrderOpen }) => {

    const { currentUser }  = useSelector((state: State) => state.usersReducer);
    const { currentOrder } = useSelector((state: State) => state.ordersReducer);

    const [scrolled,     setScrolled]     = React.useState(false);
    const [searchOpen,   setSearchOpen]   = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const userMenuRef = React.useRef<HTMLDivElement>(null);
    const cartCount   = currentOrder?.length ?? 0;

    // Scroll-aware shadow
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close user dropdown on outside click
    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('cupcake');
        window.location.href = '/';
    };

    return (
        <div className={`navbar${scrolled ? ' scrolled' : ''}`}>

            {/* Animated gradient top accent */}
            <div className="nb-top-bar" />

            <div className="nb-inner">

                {/* Hamburger — mobile only */}
                <button className="nb-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                    <MenuIcon fontSize="small" />
                </button>

                {/* Brand */}
                <NavLink to='/' className="nb-brand">
                    <img src={Logo} alt="" width="34px" />
                    <span className="nb-brand-name">The CupCake Factory</span>
                </NavLink>

                {/* Desktop nav links */}
                <nav className="nb-links">
                    {NAV_LINKS.map(link => (
                        <NavLink
                            key={link.to}
                            end={link.end}
                            to={link.to}
                            className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="nb-actions">

                    {/* Search — toggles open/closed */}
                    {searchOpen ? (
                        <div className="nb-search-open">
                            <SearchBar />
                            <button
                                className="nb-icon-btn"
                                onClick={() => setSearchOpen(false)}
                                aria-label="Close search"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="nb-icon-btn"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                        >
                            <SearchIcon fontSize="small" />
                        </button>
                    )}

                    {currentUser ? (
                        <>
                            {/* Cart with live badge */}
                            <button
                                className="nb-icon-btn nb-cart-btn"
                                onClick={() => setOrderOpen(true)}
                                aria-label={`Cart — ${cartCount} items`}
                            >
                                <ShoppingBasketIcon fontSize="small" />
                                {cartCount > 0 && (
                                    <span className="nb-cart-badge">{cartCount}</span>
                                )}
                            </button>

                            {/* User avatar + dropdown */}
                            <div className="nb-user-wrap" ref={userMenuRef}>
                                <button
                                    className="nb-avatar-btn"
                                    onClick={() => setUserMenuOpen(v => !v)}
                                    aria-label="Account"
                                    aria-expanded={userMenuOpen}
                                >
                                    <img src={currentUser.image} alt="My account" />
                                </button>

                                {userMenuOpen && (
                                    <div className="nb-dropdown" role="menu">
                                        <div className="nb-dropdown-user">
                                            <span className="nb-dropdown-name">
                                                {currentUser.firstName} {currentUser.lastName}
                                            </span>
                                            <span className="nb-dropdown-email">{currentUser.email}</span>
                                        </div>

                                        <div className="nb-dropdown-sep" />

                                        <NavLink
                                            to='/profile'
                                            className="nb-dropdown-item"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <PersonOutlineIcon fontSize="small" />
                                            My Profile
                                        </NavLink>

                                        <button
                                            className="nb-dropdown-item nb-dropdown-signout"
                                            onClick={handleLogout}
                                        >
                                            <LogoutIcon fontSize="small" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <NavLink className="nb-signin-btn" to='/login'>Sign In</NavLink>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
