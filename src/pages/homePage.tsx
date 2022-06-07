import { Grid,Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';




const HomePage:React.FC = ()=>{

    const cakeRef = React.useRef<any>(null);
    const textRef = React.useRef<any>(null);
    const menuImage = React.useRef<any>(null);
    const cupcakeRef = React.useRef<any>(null);

    const scrollAnimation = ():void=>{
        window.onscroll = ()=>{
            let scroll = window.pageYOffset;
            if(scroll > 300){
                cupcakeRef.current.style.left = "10%";
            }
        }
    
    }


    React.useEffect(()=>{

         scrollAnimation();

        setTimeout(()=>{
            cakeRef.current.style.bottom = "-50px"; 
           
            setTimeout(()=>{
                textRef.current.style.opacity = 1;
            },2000) 
        },500)
       
    },[])

    return(
        <div className="homepage-container">
            
            {/* header */}
            <section className="header">
                <img className='stewberry-image stewberry-2' src="./images/strewberry.png"  alt="" />
                <img className='stewberry-image stewberry-1' src="./images/strewberry.png"  alt="" />
                <img className='background-image' src="./images/homePageBanner.png" alt="cupcake banner" />
                <img ref={cakeRef} className='cupcake-image' src="./images/choclate_cake.png" alt="" />    
                <h1>The CupCake Factory</h1>
                <h2 ref={textRef} >Eat what you like</h2>
            </section>
          
            {/* end header */}


            {/* cupcake section */}
            <section className="home-cupcake">
                <Grid container>
                    <Grid item xs={12} md={6} style={{display:'flex',justifyContent:'center'}}>
                        <img ref={cupcakeRef} src="./images/cupcake.png" width="70%" alt="" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h2>Coconut Cream Pie Cheesecake</h2>
                        <p>Choose from More than 30 Legendary Flavors of Cheesecake</p>
                        <div className="home-cupcake-action">
                            <Link to='/cupcakes'><Button>Explore our Cupcakes</Button></Link>
                        </div>
                    </Grid>
                </Grid>
            </section>


            {/* end cupcake section */}



            {/* menu section */}
            <section className='home-menu'>
                    <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                        <Grid item xs={12} md={5}>
                            <h2>Our Menu</h2>
                            <p>Our menu has more than 250 dishes, made fresh from scratch, to order, every day.</p>
                            <Link to='/menu'><Button>Explore Menu</Button></Link>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <img ref={menuImage} className='menu-image' src="./images/ourMenuBanner2.png" alt="" />
                        </Grid>
                    </Grid>
            </section>
            {/* end menu section */}



            {/* restaurant section */}
            <section className="home-restaurant">
                <img src="./images/homeRestaurant.jpg"  alt="" />
                <div className="home-restaurant-box">
                    <h2>Find A Place To Eat</h2>
                    <Link to='/restaurants'><Button variant="contained" style={{background:'green',margin:'20px 0',minWidth:'200px'}}>Find</Button></Link>
                </div>
            </section>
            {/* end restaurant section */}

        


           

        </div>
    )

}



export default HomePage