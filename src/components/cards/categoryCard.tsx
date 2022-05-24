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
        <div className="category-card" onMouseEnter={()=>fn(category.image)} onClick={()=>navigate(`/menu/${category.title.toLowerCase()}`,{state:{categoryId:category._id,catTitle:category.title}})}>
            <div className="category-card-image">
                <img src={category.image}  alt={category.title} />
            </div>
            <h3 className='category-card-title'>{capitilize(category.title)}</h3>
        </div>
    )
}


export default CategoryCard;