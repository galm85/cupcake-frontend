import { TableCell, TableRow,Table, TableHead, TableBody } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { NavLink,useSearchParams } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../../redux/actions/products.actions';
import {State,Product} from '../../../utils/types';
import {capitilize} from '../../../utils/functions';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import NavigationBar from '../../components/navigationBar';
import FormSelect from '../../../components/forms/formSelect';

const options = [
    {_id:5,title:'5'},
    {_id:10,title:'10'},
    {_id:25,title:'25'},
]

const ProductsAdmin:React.FC = ()=>{

    let page:number = 1;
    // let itemsPerPage:number = 10;

    // const [page,setPage] = React.useState<number>(1);
    const [itemsPerPage,setItemsPerPage] = React.useState<number>(10);

    const [searchParams] = useSearchParams();
    if(searchParams.get('page')){
        page = Number(searchParams.get('page'));
    }



    const dispatch:any = useDispatch();
    const {products,totalProducts} = useSelector((state:State)=>state.productsReducer);

    React.useEffect(()=>{
        dispatch(getProducts(page,itemsPerPage));
    },[page,itemsPerPage]);
    

    return (
       
       <div className="admin-content">
           
           <h1 className="admin-title">Admin Products</h1>
           
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
               <NavLink className="add-new-btn" to="/admin/products/new-product">New</NavLink>
               <FormSelect label='Items Per Page' onChange={(e:any)=>setItemsPerPage(e.target.value)} name="itemsperpage" options={options} value={itemsPerPage} />
           </div>

           <div className="products-table">
               <Table className="admin-table" style={{margin:'20px 0'}}>
                   <TableHead>
                       <TableRow>
                           <TableCell>Pos</TableCell>
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
                                <TableCell>{product.position}</TableCell>
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
               <NavigationBar totalItems={totalProducts} itemPerPage={itemsPerPage} currentPage={page}/>
           </div>
       </div>

    )

}


export default ProductsAdmin;