import { Grid } from '@mui/material'
import React from 'react'
import CupcakeCard from '../components/cards/cupcakeCard'




const HomePage:React.FC = ()=>{


    return(
        <div className="homepage-container">
            
            {/* header */}
            <section className="header">
                <img src="./images/cupcakeMain.jpg" alt="cupcake banner" />
                <h1>The CupCake Factory</h1>
            </section>
            {/* end header */}


            {/* best cupcake */}
            <section className='best-cupcakes'>
                <h1>Our best cupcakes</h1>
                
                <div className="cupcakes-images" style={{padding:'20px 20px'}}>
                    <Grid container spacing={5}>
                        <CupcakeCard image='1.jpg'/>
                        <CupcakeCard image='2.jpg'/>
                        <CupcakeCard image='3.jpg'/>
                    </Grid>
                </div>
            </section>
            {/* end best cupcake */}

            {/* menu card */}
            <section className='home-menu'>
                <h1>Our Menu</h1>
                
                <div className="menu-images" style={{padding:'20px 20px'}}>
                    <Grid container spacing={5}>
                        <CupcakeCard image='1.jpg'/>
                        <CupcakeCard image='2.jpg'/>
                        <CupcakeCard image='3.jpg'/>
                    </Grid>
                </div>
            </section>
            {/* menu card */}

            {/*reviews */}
            <section className='home-menu'>
                <h1>Reviews</h1>
                
                <div className="menu-images" style={{padding:'20px 20px'}}>
                    <Grid container spacing={5}>
                        <CupcakeCard image='1.jpg'/>
                        <CupcakeCard image='2.jpg'/>
                        <CupcakeCard image='3.jpg'/>
                    </Grid>
                </div>
            </section>
            {/* end revies */}


            {/*about us */}
            <section className='home-menu'>
                <h1>About us</h1>
                
                <div className="menu-images" style={{padding:'20px 20px'}}>
                    <Grid container spacing={5}>
                        <CupcakeCard image='1.jpg'/>
                        <CupcakeCard image='2.jpg'/>
                        <CupcakeCard image='3.jpg'/>
                    </Grid>
                </div>
            </section>
            {/* about us */}

        </div>
    )

}



export default HomePage