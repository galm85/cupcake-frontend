import { Grid } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import RotateText from '../components/rotateText';
import { getCupcakes } from '../redux/actions/products.actions';
import { Product, State } from '../utils/types';
import CupcakeCard from '../components/cards/cupcakeCard';
import BreadCrumbs from '../components/Breadcrumbs';


import CakesBanner from '../assets/cakesbanner.jpg';
import Chef from '../assets/chef.jpg';
import EventImg from '../assets/event.jpg'

const CupcakePage:React.FC = ()=>{


    const dispatch:any = useDispatch();
    const cupcakes:Product[] = useSelector((state:State)=> state.productsReducer.products);
    const [image,setImage] = React.useState<string | null>(null);
    const [screen,setScreen] = React.useState<number>(0);
    
    const getScreenWidth = ()=>{
        const w:any = window.innerWidth;
        setScreen(w);
    }

    React.useEffect(()=>{
        dispatch(getCupcakes());
        getScreenWidth();
    },[])

    const style:any = {
        position:'absolute',
        zIndex:3,
        top:'10vh',
        left:'10%',
        backgroundColor:'rgba(255,255,255,0.5)',
        
    } 

   


    return(
        <div className="cupcake-page" style={{paddingBottom:'100px'}}>

            <div className="cupcake-breadcrumps" style={style}>
                <BreadCrumbs currentPage='Cupcakes' links={[{label:'Home',link:'/'}]}/>
            </div>

            <header className='cupcake-page-header'>
                <img src={CakesBanner} alt="cupcake on a table" />
                <h1 className="page-title">Our CupCakes</h1>
            </header>

            <div className="cupcake-page-banners">
                <RotateText text="OVER-250-CAKES-TYPES" space={7} name="cake"  image={CakesBanner} radius={300} fontSize={1.5}/>
                <RotateText text="HOME-MADE-CUPCAKES" space={7} name='berry'  image={Chef} radius={400} fontSize={1.5}/>
                <RotateText text="CAKES-FOR-EVERY-EVENT" space={7} name='event'  image={EventImg} radius={300} fontSize={1.5}/>
            </div>



            <hr />


            <section className="cupcake-page-products">
                <Grid container style={{display:'flex',justifyContent:'space-between'}}>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={5} style={{display:'flex',justifyContent:'space-between'}}>
                        {cupcakes && cupcakes.map((cupcake:Product)=>(
                            <Grid item xs={12}  key={cupcake._id} onMouseEnter={()=>setImage(cupcake.image)} onMouseLeave={()=>setImage('')} >
                                <CupcakeCard cupcake={cupcake}  />
                            </Grid> 
                        ))} 
                        </Grid>
                    </Grid>
                    {screen && screen>1000 && image &&  
                        <Grid item xs={5}>
                            <div className="capcake-page-products-image">
                                <img src={image} alt="cake image" />
                            </div>
                        </Grid>
                        }

                </Grid>
                

            </section>
        </div>
    )
}


export default CupcakePage;