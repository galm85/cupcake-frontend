import { Grid } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import RotateText from '../components/rotateText';
import { getCupcakes } from '../redux/actions/products.actions';
import { Product, State } from '../utils/types';
import CupcakeCard from '../components/cards/cupcakeCard';


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


   


    return(
        <div className="cupcake-page">
            <header className='cupcake-page-header'>
                <img src="./images/cakesbanner.jpg" alt="cupcake on a table" />
                <h1 className="page-title">Our CupCakes</h1>
            </header>

            <div className="cupcake-page-banners">
                <RotateText text="Our-new-Cupcakes" space={5} name="cake"  image="cakesbanner.jpg" radius={300} fontSize={2}/>
                <RotateText text="tery cthis s" space={5} name='berry'  image="strewberry.png" radius={300} fontSize={2}/>
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