import { TableCell, TableRow,Table, TableHead, TableBody } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../../redux/actions/products.actions';
import {State,Product} from '../../../utils/types';
import {capitilize} from '../../../utils/functions';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const ProductsAdmin:React.FC = ()=>{


    const dispatch:any = useDispatch();
    const {products} = useSelector((state:State)=>state.productsReducer);

    React.useEffect(()=>{
        dispatch(getProducts(3,12));
       
    },[]);
    

    return (
       
       <div className="admin-content">
           
           <h1 className="admin-title">Admin Products</h1>
           
           <div>
               <NavLink className="add-new-btn" to="/admin/products/new-product">New</NavLink>
           </div>

           <div className="products-table">
               <Table className="admin-table" style={{margin:'20px 0'}}>
                   <TableHead>
                       <TableRow>
                           <TableCell>#</TableCell>
                           <TableCell>Image</TableCell>
                           <TableCell>Title</TableCell>
                           <TableCell align='center'>Price</TableCell>
                           <TableCell>Category</TableCell>
                           <TableCell align='center'>Vegan</TableCell>
                           <TableCell align='center'>Gluten Free</TableCell>
                           <TableCell>Setting</TableCell>
                           <TableCell>Setting</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                        {products && products.map((product:Product,index:number)=>(
                            <TableRow key={product._id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell><img src={product.image} width="50px"  alt={product.title} /></TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell align='center'>${product.price}</TableCell>
                                <TableCell>{capitilize(product.category_title[0].title)}</TableCell>
                                <TableCell align='center'>{product.isVegan ? <CheckIcon color='success'/> : <ClearIcon color="error"/>}</TableCell>
                                <TableCell align='center'>{product.isGlutenFree ? <CheckIcon color='success'/> : <ClearIcon color="error"/>}</TableCell>
                                <TableCell>
                                   <button className='btn edit-btn'>Edit</button>
                                </TableCell>
                                <TableCell>
                                   <button onClick={()=>dispatch(deleteProduct(product._id))}  className='btn delete-btn'>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                   </TableBody>
               </Table>
           </div>
       </div>

    )

}


export default ProductsAdmin;