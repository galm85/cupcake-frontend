import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Divider, Grid } from '@mui/material';
import { Product, State, User } from '../utils/types';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';
import { useSelector,useDispatch } from 'react-redux';
import { addItemToOrder } from '../redux/actions/orders.actions';
import { getUserData } from '../redux/actions/users.actions';



const ProductPage:React.FC = ()=>{

    const navigate:any = useNavigate();
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

    }

    React.useEffect(()=>{
        dispatch(getUserData());
    },[])
    

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
                        {user ? 
                            <Button variant="contained" onClick={()=>handleAddItem(product)}>Add To Order</Button>
                        :
                            <Button variant="contained" color='info' onClick={()=>navigate(`/login?url=${location.pathname}`,{state:location.state})}  >Sign in first</Button>
                        }
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