import * as React from 'react';
import {Grid} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Category, State } from '../utils/types';
import { getAllCategories } from '../redux/actions/categories.actions';
import CategoryCard from '../components/cards/categoryCard';
import BreadCrumbs, { BreadCrumbsLink } from '../components/Breadcrumbs';



const MenuPage:React.FC = ()=>{

    const dispatch:any = useDispatch();
    const {categories} = useSelector((state:State)=>state.categoriesReducer)
    const [hoverImage,setHoverImage] = React.useState<string>('');

    const breadLinks:BreadCrumbsLink[] = [
        {label:'home',link:'/'},
        
    ]

    React.useEffect(()=>{
        dispatch(getAllCategories());
    },[])

    const handleHover = (image:string):void=>{
        setHoverImage(image);
    }


    return (
       <div className="menu-page" style={{width:'90%',margin:'auto'}}>
           <BreadCrumbs links={breadLinks} currentPage="menu" />
           <h1 className='title'>Our Menu</h1>
           <Grid container style={{display:'flex',justifyContent:'space-between'}}>
               <Grid item xs={12} sm={4}>
                   {categories && categories.map((category:Category)=>(
                        <CategoryCard key={category._id}  category={category} fn={handleHover} />
                   ))}

               </Grid>
               <Grid item xs={12} sm={4}>
                    <img src={hoverImage} style={{borderRadius:'50%'}} alt="" width="100%" />
               </Grid>
           </Grid>
       </div>
    )
}


export default MenuPage;