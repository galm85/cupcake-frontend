import { Table, TableBody, TableCell, TableHead, TableRow,TableFooter } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { deleteCategory, getAllCategories } from '../../../redux/actions/categories.actions';
import { Category, State } from '../../../utils/types';



const CategoriesAdmin:React.FC = ()=>{

    const dispatch:any = useDispatch();
    const {categories} = useSelector((state:State)=>state.categoriesReducer);
    

    React.useEffect(()=>{
         dispatch(getAllCategories());
    },[])

    return(
        <div className="admin-content">

            <h1 className='admin-title'>Admin Categories</h1>

            <div>
                <NavLink className="add-new-btn" to='/admin/categories/new-category'>New</NavLink>
            </div>

            <div className="categories-table">
                <Table className="admin-table" style={{margin:'20px 0'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell style={{textAlign:'center'}}>Setting</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories && categories.map((category:Category,index:number)=>(
                           <TableRow key={category._id}>
                               <TableCell>{index +1}</TableCell>
                               <TableCell><img width="50px" src={category.image} alt={category.title} /></TableCell>
                               <TableCell>{category.title}</TableCell>
                               <TableCell style={{display:'flex',justifyContent:'space-between'}}>
                                   <button className='btn edit-btn'>Edit</button>
                                   <button onClick={()=>dispatch(deleteCategory(category._id))} className='btn delete-btn'>Delete</button>
                                </TableCell>
                           </TableRow>
                    ))}
                    </TableBody>
                </Table>
                    <div className="table-footer"></div>
            </div>
            
        </div>
    )
}


export default CategoriesAdmin;