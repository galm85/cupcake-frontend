import { Drawer } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {State,User} from './utils/types';
import { getCurrentOrder } from './redux/actions/orders.actions';

// components
import {Navbar,Sidenav,Footer,Loading, OrderMenu} from './components';
import { CupcakePage, HomePage, LoginPage, RegisterPage,MenuPage,CategoryPage,ProductPage, ProfilePage, CheckoutPage,RestaurantsPage,AboutPage, CareersPage,ApplyPage } from './pages';
import { Dashboard } from './admin';

function App() {

  const dispatch:any = useDispatch();
  const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
  const [menuOpen,setMenuOpen] = React.useState<boolean>(false);
  const [orderOpen,setOrderOpen] = React.useState<boolean>(false);
  const {loading} = useSelector((state:State)=>state.settingReducer);


  React.useEffect(()=>{
    if(user){
      dispatch(getCurrentOrder(user._id));
    }
  },[])


  return (
    <div className="app">
      
      <Drawer anchor='left' open={menuOpen} onClose={()=>setMenuOpen(false)}>
        <Sidenav setMenuOpen={setMenuOpen}/>
      </Drawer>

      <Drawer anchor='right' open={orderOpen} onClose={()=>setOrderOpen(false)}>
        <OrderMenu setOrderOpen={setOrderOpen}/>
      </Drawer>

      <header>
        <Navbar setMenuOpen={setMenuOpen} setOrderOpen={setOrderOpen}/>
        {loading && <Loading  /> }
        
      </header>
      
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/cupcakes' element={<CupcakePage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/menu/:categoryName' element={<CategoryPage />} />
          <Route path='/menu/:categoryName/:productName' element={<ProductPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/restaurants' element={<RestaurantsPage/>} />
          <Route path='/about-us' element={<AboutPage/>} />
          <Route path='/careers' element={<CareersPage/>} />
          <Route path='/careers/apply/:job_id' element={<ApplyPage/>} />
          
          
          <Route path='/admin/*' element={<Dashboard />} />
          

        </Routes>
      </main>
      <footer>
          <Footer/>
      </footer>
    </div>
  );
}

export default App;
