import React from 'react'
import { Product } from '../../utils/types'
import { useNavigate } from 'react-router-dom';

type Props = {
    product: Product,
    catTitle: string;
}

const ProductCard: React.FC<Props> = ({ product, catTitle }) => {

    const navigate: any = useNavigate();

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/menu/${catTitle.toLowerCase()}/${product.title.toLowerCase()}`, { state: { product, catTitle } })}
        >
            <div className="product-card-image">
                <img src={product.image} alt={product.title} />
                {product.isVegan && <span className="product-badge vegan">Vegan</span>}
                {product.isGlutenFree && <span className="product-badge gluten-free">GF</span>}
            </div>
            <div className="product-card-body">
                <h3>{product.title}</h3>
                <p>{product.description.substring(0, 80)}{product.description.length > 80 ? '…' : ''}</p>
                <div className="product-card-footer">
                    <span className="product-price">${product.price}</span>
                    <span className="product-card-arrow">→</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
