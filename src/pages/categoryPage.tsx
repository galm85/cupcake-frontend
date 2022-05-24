import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSingleProduct,getProductsByCategory } from '../redux/actions/products.actions';
import { Product, State } from '../utils/types';
import ProductCard from '../components/cards/productCard';
import { Grid } from '@mui/material';

const CategoryPage:React.FC = ()=>{

    const location:any = useLocation();
    const dispatch:any = useDispatch();

    const {id,catTitle}= location.state;
    
    
    const {products} = useSelector((state:State)=>state.productsReducer);


    React.useEffect(()=>{
        if(id){
            dispatch(getProductsByCategory(id))  
        }
    },[])


    return (
        <div className="category-page">
                <h1>{catTitle.toUpperCase()}</h1>
                <Grid container style={{display:'flex',justifyContent:'space-around'}}>
                    {products && products.map((product:Product)=>(
                    <Grid item xs={11} sm={10} md={5} key={product._id} >
                        <ProductCard catTitle={catTitle} product={product} />
                    </Grid>
                    ))}
                </Grid>
        </div>
    )
}



export default CategoryPage;