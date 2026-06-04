import React from 'react'
import { Product } from '../../utils/types';
import { useNavigate } from 'react-router-dom'

type Props = {
    cupcake: Product;
}

const CupcakeCard: React.FC<Props> = ({ cupcake }) => {

    const navigate: any = useNavigate();

    return (
        <div
            className="cupcake-card"
            onClick={() => navigate(`/menu/cupcakes/${cupcake.title.toLowerCase()}`, { state: { product: cupcake, catTitle: 'Cupcakes' } })}
        >
            <div className="cupcake-card-image">
                <img src={cupcake.image} alt={cupcake.title} />
            </div>
            <div className="cupcake-card-data">
                <h2>{cupcake.title}</h2>
                <p>{cupcake.description.substring(0, 100)}{cupcake.description.length > 100 ? '…' : ''}</p>
                <div className="cupcake-card-footer">
                    <span className="cupcake-price">${cupcake.price}</span>
                    <span className="cupcake-card-cta">Order now →</span>
                </div>
            </div>
        </div>
    )
}

export default CupcakeCard;
