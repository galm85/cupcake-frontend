import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    totalItems:number;
    itemPerPage:number;
    currentPage?:number
}

export const NavigationBar:React.FC<Props>  = ({totalItems,itemPerPage,currentPage})=>{

    const arr:number[] = [];
    const pages = Math.ceil(totalItems/itemPerPage);

    for(let i=1 ; i<= pages ; i++){
        arr.push(i);
    }
    
    

    return(
        <div className="navigation-bar">
            {arr.map(i=>(
                <NavLink className={currentPage === i ? 
                            'navigation-bar-item navigation-bar-item-active' : 
                            'navigation-bar-item'} 
                            to={`/admin/products?page=${i}`} 
                            key={i}
                            aria-disabled={currentPage === i ? 'true':'false'}
                            >
                    {i}
            </NavLink>
            ))}
        </div>
    )
}


export default React.memo(NavigationBar);