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
    const [hoverImage,setHoverImage] = React.useState<string>('./images/menu.jpg');
    const hoverRef = React.useRef<any>(null);

    const breadLinks:BreadCrumbsLink[] = [
        {label:'home',link:'/'},
        
    ]

    React.useEffect(()=>{
        dispatch(getAllCategories());
    },[])


  

    const handleHover = (image:string):void=>{
       
        hoverRef.current.style.opacity = 0;
        setTimeout(()=>{
            setHoverImage(image);
        },300)
        setTimeout(()=>{
            hoverRef.current.style.opacity = 1;

        },500)
       
       
        
       
    }


    return (
       <div className="menu-page">
           <BreadCrumbs links={breadLinks} currentPage="menu" />
           <h1 className='page-title'>Our Menu</h1>
           <Grid container className="manu-page-grid-container" >
               <Grid item xs={12} md={8}>
                   <Grid container columnSpacing={8} rowSpacing={2}>
                            {categories && categories.map((category:Category)=>(
                            <Grid item xs={12} sm={5} key={category._id}>
                                <CategoryCard   category={category} fn={handleHover} />
                            </Grid>
                            ))}
                    </Grid>

               </Grid>
               <Grid item xs={12} md={4} className="manu-page-hover-image" >
                    <img ref={hoverRef}  src={hoverImage}  alt=""  />
               </Grid>
           </Grid>
       </div>
    )
}


export default MenuPage;