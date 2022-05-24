import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSingleProduct,getProductsByCategory } from '../redux/actions/products.actions';
import { Product, State } from '../utils/types';
import ProductCard from '../components/cards/productCard';
import { Grid } from '@mui/material';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import { capitilize } from '../utils/functions';

const CategoryPage:React.FC = ()=>{

    const location:any = useLocation();
    const dispatch:any = useDispatch();

    const {categoryId,catTitle}= location.state;
    const {products} = useSelector((state:State)=>state.productsReducer);
    
    const breadLinks:BreadCrumbsLink[] = [
        {label:'home',link:'/'},
        {label:'menu',link:'/menu'},
    ]
    
    


    React.useEffect(()=>{
        if(categoryId){
            dispatch(getProductsByCategory(categoryId))  
        }
    },[])


    return (
        <div className="category-page">
            <BreadCrumbs currentPage={capitilize(catTitle)} links={breadLinks}/>
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