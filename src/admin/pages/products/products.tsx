import { TableCell, TableRow,Table, TableHead, TableBody } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { NavLink,useSearchParams,useLocation,useNavigate } from 'react-router-dom';
import { deleteProduct, getProducts, getProductsByCategory } from '../../../redux/actions/products.actions';
import {State,Product, Category} from '../../../utils/types';
import {capitilize} from '../../../utils/functions';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import NavigationBar from '../../components/navigationBar';
import FormSelect from '../../../components/forms/formSelect';
import { getAllCategories } from '../../../redux/actions/categories.actions';

const options = [
    {_id:5,title:'5'},
    {_id:10,title:'10'},
    {_id:25,title:'25'},
]

const ProductsAdmin:React.FC = ()=>{

    let page:number = 1;
    const [searchParams] = useSearchParams();
    if(searchParams.get('page')){
        page = Number(searchParams.get('page'));
    }


    const [itemsPerPage,setItemsPerPage] = React.useState<number>(10);
    const [currentCategory,setCurrentCatgory] = React.useState<string>('all');

    const location:any = useLocation();
    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const {products,totalProducts} = useSelector((state:State)=>state.productsReducer);
    const categories:Category[] = useSelector((state:State)=>state.categoriesReducer.categories);

    React.useEffect(()=>{
        dispatch(getProducts(page,itemsPerPage,currentCategory));
        dispatch(getAllCategories());
    },[page,itemsPerPage]);
    

    const handleCategory = (e:any)=>{
        setCurrentCatgory(e.target.value);
        dispatch(getProducts(page,itemsPerPage,e.target.value));
        

    }

    return (
       
       <div className="admin-content">
           
           <h1 className="admin-title">Admin Products</h1>
           
           <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
               <NavLink className="add-new-btn" to="/admin/products/new-product">New</NavLink>
               <FormSelect label='Items Per Page' onChange={(e:any)=>setItemsPerPage(e.target.value)} name="itemsperpage" options={options} value={itemsPerPage} />
               <FormSelect 
                    label='Categoty' 
                    onChange={handleCategory} 
                    name="itemsPerCategory" 
                    options={[{_id:'all',title:'all'},...categories]} 
                    value={currentCategory} />
               
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
                                   <button onClick={()=>navigate('/admin/products/edit-product',{state:product})} className='btn edit-btn'>Edit</button>
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