import { Drawer } from '@mui/material';
import React from 'react';
import './App.css';

// components
import {Navbar,Sidenav} from './components/index';

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
      
      <main>main</main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
