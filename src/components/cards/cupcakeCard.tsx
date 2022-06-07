import React from 'react'
import { Product } from '../../utils/types';
import {useNavigate} from 'react-router-dom'

type Props = {
    cupcake:Product;
}

const CupcakeCard:React.FC<Props> = ({cupcake})=>{

    const navigate:any = useNavigate();

    return(
        <div className="cupcake-card" onClick={()=>navigate(`/menu/cupcakes/${cupcake.title.toLowerCase()}`,{state:{product:cupcake,catTitle:'Cupcakes'}})} >
            <img src={cupcake.image} alt={cupcake.title} />
            <div className="cupcake-card-data">
                <h2>{cupcake.title}</h2>
                <p>{cupcake.description}</p>
                <h4>${cupcake.price}</h4>
            </div>
        </div>
    )
}



export default CupcakeCard;