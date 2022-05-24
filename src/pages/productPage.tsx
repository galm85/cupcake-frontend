import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Divider, Grid } from '@mui/material';
import { Product } from '../utils/types';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';



const ProductPage:React.FC = ()=>{

    const location:any = useLocation();
    const catTitle:string = location.state.catTitle;
    const product:Product = location.state.product;

    const breadLinks:BreadCrumbsLink[] = [
        {label:'home',link:'/'},
        {label:'menu',link:'/menu'},
        {label:catTitle,link:`/menu/${catTitle}`,categoryId:product.category,catTitle:catTitle}
    ]
    

    return(
        <div className="product-page">
            
            <BreadCrumbs currentPage='Pasta Napolitana' links={breadLinks} />
              
            <Grid container className="product-page-container" style={{width:'80%',margin:'auto'}}>
                
                <Grid item xs={12} md={6} className="product-page-left" style={{display:'flex',flexDirection:'column'}}>
                    <div className='product-page-data'>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    </div>
                   
                    <div className="product-page-tags">
                        <h4>Price ${product.price}</h4>
                        <h4>Vegan: {product.isVegan ? <CheckIcon color="primary"/> : <ClearIcon color="error"/>}</h4>
                        <h4>Gluten Free: {product.isGlutenFree ? <CheckIcon color="primary"/> : <ClearIcon color="error"/>}</h4>
                    </div>

                    <div className="product-page-actions">
                        <Button variant="contained">Add To Order</Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} className="product-page-right">
                    <img src={product.image} alt={product.title}  width="100%" />
                </Grid>
            </Grid>
        </div>
    )
}



export default ProductPage;