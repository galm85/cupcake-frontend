import { Grid } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LegalDialog from './dialogs/legalDialog';
import { cookiePolicy, privacyPolicy, termOfUse } from '../utils/legalData';

const Footer:React.FC = ()=>{
    return(
       <div className="footer">
           <Grid container spacing={3} style={{padding:'50px 200px',display:'flex',justifyContent:'space-between'}}>
               <Grid item xs={12} md={3}>
                  <div className="footer-information">
                      <h3>The CupCake Factory</h3>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
               </Grid>
               <Grid item xs={12} md={5}>
                  <div className="footer-navigation">
                      <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                          <Grid item xs={6} style={{display:'flex',flexDirection:'column'}}>
                            <Link to='/'>Home</Link>
                            <Link to='/cupcakes'>Cupcakes</Link>
                            <Link to='/menu'>Menu</Link>
                          </Grid>
                          <Grid item xs={6} style={{display:'flex',flexDirection:'column'}}>
                            <Link to='/restaurants'>Restaurants</Link>
                            <Link to='/careers'>Careers</Link>
                          </Grid>
                      </Grid>
                  </div>
               </Grid>
               <Grid item xs={12} md={2}>
                   <footer className="social-media">
                       <Link to='#'><FacebookIcon fontSize='large'/></Link>
                       <Link to='#'><InstagramIcon fontSize='large'/></Link>
                       <Link to='#'><TwitterIcon fontSize='large'/></Link>
                       <Link to='#'><MusicNoteIcon fontSize='large'/></Link>
                   </footer>
               </Grid>
            
           </Grid>


           <Grid container>
               <Grid item xs={12}>
                   <div className="legal-items">
                        <LegalDialog legalData={termOfUse} />
                        <p>|</p>
                        <LegalDialog legalData={privacyPolicy}/>
                        <p>|</p>
                        <LegalDialog legalData={cookiePolicy}/>
                        
                   </div>
               </Grid>
           </Grid>


           <Grid container>
               <Grid item xs={12}>
                   <div className="author-information">
                        <p> The CupCake Factory | <a href="https://www.galwebdev.com" target="_blank">GWD</a> | {new Date().getFullYear()} &copy; </p>
                   </div>
               </Grid>
           </Grid>
       </div>
    )
}

export default Footer;