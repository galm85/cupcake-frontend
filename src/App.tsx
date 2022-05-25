import { Drawer } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';

// components
import {Navbar,Sidenav,Footer,Loading} from './components';
import { CupcakePage, HomePage, LoginPage, RegisterPage,MenuPage,CategoryPage,ProductPage, ProfilePage } from './pages';
import { Dashboard } from './admin';
import { State } from './utils/types';

function App() {

  const [menuOpen,setMenuOpen] = React.useState<boolean>(false);
  const {loading} = useSelector((state:State)=>state.settingReducer);
  return (
    <div className="app">
      
      <Drawer anchor='left' open={menuOpen} onClose={()=>setMenuOpen(false)}>
        <Sidenav/>
      </Drawer>

      <header>
        <Navbar setMenuOpen={setMenuOpen}/>
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
