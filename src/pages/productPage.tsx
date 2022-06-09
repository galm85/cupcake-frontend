import React from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Divider, Grid } from '@mui/material';
import { Product, State, User } from '../utils/types';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { addItemToOrder } from '../redux/actions/orders.actions';



const ProductPage:React.FC = ()=>{

    const location:any = useLocation();
    const dispatch:any = useDispatch();
    const catTitle:string = location.state.catTitle;
    const product:Product = location.state.product;
    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);

    const breadLinks:BreadCrumbsLink[] = [
        {label:'home',link:'/'},
        {label:'menu',link:'/menu'},
        {label:catTitle,link:`/menu/${catTitle}`,categoryId:product.category,catTitle:catTitle}
    ]


    const handleAddItem = async(product:Product)=>{


        let item:any = {...product};
        item.amount = 1;
        dispatch(addItemToOrder(item,user._id));
        // const res = await axios.patch(`http://localhost:4000/orders/current-order/${user._id}`,item);

    }
    

    return(
        <div className="product-page">
            
            <BreadCrumbs currentPage={product.title} links={breadLinks} />
              
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
                        <Button variant="contained" onClick={()=>handleAddItem(product)}>Add To Order</Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} className="product-page-right">
                    <img src={product.image} alt={product.title}  width="100%" style={{maxHeight:'300px',objectFit:'contain'}} />
                </Grid>
            </Grid>
        </div>
    )
}



export default ProductPage;