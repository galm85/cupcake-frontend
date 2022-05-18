import { Drawer } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// components
import {Navbar,Sidenav,Footer} from './components';
import { HomePage, RegisterPage } from './pages';

function App() {

  const [menuOpen,setMenuOpen] = React.useState(false);

  return (
    <div className="app">
      
      <Drawer anchor='left' open={menuOpen} onClose={()=>setMenuOpen(false)}>
        <Sidenav/>
      </Drawer>

      <header>
        <Navbar setMenuOpen={setMenuOpen}/>
      </header>
      
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/register' element={<RegisterPage/>} />
        

        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
