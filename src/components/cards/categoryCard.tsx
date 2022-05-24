import React from 'react'
import { capitilize } from '../../utils/functions';
import { Category } from '../../utils/types';
import {useNavigate} from 'react-router-dom';

type Props = {
    category:Category;
    fn:any;
}


const CategoryCard:React.FC<Props> = ({category,fn})=>{

    const navigate:any = useNavigate();

    return(
        <div className="category-card" onMouseOver={()=>fn(category.image)} style={{backgroundImage:`url(${category.image})`}} onClick={()=>navigate(`/menu/${category.title.toLowerCase()}`,{state:{id:category._id,catTitle:category.title}})}>
            <h3 className='category-card-title'>{capitilize(category.title)}</h3>
        </div>
    )
}


export default CategoryCard;