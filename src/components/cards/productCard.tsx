import React from 'react'
import { Product } from '../../utils/types'
import { useNavigate } from 'react-router-dom';



type Props = {
    product:Product,
    catTitle:string;
}


const ProductCard:React.FC<Props> = ({product,catTitle})=>{

    const navigate:any = useNavigate();


    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-card-data">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <div className="product-card-details">
                <h4> ${product.price}</h4>
            </div>
        </div>
    )
}


export default ProductCard;