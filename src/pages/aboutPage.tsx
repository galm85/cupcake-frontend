import { Divider, Grid } from '@mui/material';
import React from 'react'
import BreadCrumbs from '../components/Breadcrumbs';



const AboutPage:React.FC = ()=>{
    return (
        <div className="about-page">
            <BreadCrumbs currentPage='About Us' links={[{label:'home',link:'/'}]}/>
            <h1 className="page-title">Our Story</h1>
            
            <section className="begin">
                <h2>How We Began</h2>
                <p>
                    In the 1965, Peter found a recipe in her local San Antonio newspaper that inspired her  CupCake. Everyone loved his recipe so much he decided to open a small bakery, but eventually gave it up to focus on raising her children, Jonathan and Roman. He moved her baking equipment to her basement kitchen and continued to sell cakes to some of the best restaurants in town.</p>
                <p>
                    In 1975, Peter and his wife Jenna moved to Oragon to try one last time to have their own business. With the last of their savings, they opened The CupCake Factory Bakery and began selling Peter’s cakes to restaurants throughout Oragon
                </p>
                
                <div className="begin-image">
                    <img src="./images/old1.jpg" alt="cupcake funders" />
                    <small>
                        The Founders Family of The Cupcake factory 1969
                    </small>
                </div>
            </section>

            <Divider style={{margin:'40px 0 0 20px'}} />

            <section className="reviews">
                <h2>The CupCake on the Media</h2>
                <Grid container>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>"I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours"</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>"I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours"</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>"I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours"</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>"I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours"</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>"I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours"</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                    <Grid item xs={10} md={4}>
                        <div className="about-page-review">
                            <h3>I Attempted To Eat 40 Cheesecake Factory Dishes In Two Hours</h3>
                            <h5>Sara Smith - The Orogon Times</h5>
                        </div>
                    </Grid>
                </Grid>
            </section>

        </div>
    )
}


export default AboutPage;