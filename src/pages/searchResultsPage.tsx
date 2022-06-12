import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Product, State } from '../utils/types'
import {useNavigate,useParams} from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductCard from '../components/cards/productCard';
import { searchProducts } from '../redux/actions/products.actions';


const SearchResultsPage:React.FC = ()=>{

    const {value} = useParams();
    const dispatch:any = useDispatch();
    const navigate:any = useNavigate();
    const products:Product[] = useSelector((state:State)=>state.productsReducer.products);


    React.useEffect(()=>{
        if(value){
            dispatch(searchProducts(value));
        }
    },[value])

    return (
        <div className="seatch-results-page">
            <h1 style={{paddingTop:'50px'}} className="page-title">reasults for: ' <span style={{fontWeight:'lighter',textDecoration:'italic'}}>{value}</span> '</h1>
            {products ? 
           
                <Grid container spacing={5} className="products-results">
                {products.map((product)=>(
                    <Grid item xs={11} md={4} key={product._id}>
                        <ProductCard product={product} catTitle={product.category_title[0].title}/>
                    </Grid>
                    ))}
                </Grid>

                :
                <div>
                    <h2><i>No Products found</i></h2>
                </div>
            
        }
        </div>
    )
}


export default SearchResultsPage