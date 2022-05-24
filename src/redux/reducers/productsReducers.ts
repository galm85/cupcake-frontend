import { Action, Product } from "../../utils/types"

export type ProductReducerState = {
    products:Product[];
    product:Product;
    totalProducts:number;
}

const initialState:ProductReducerState = {
    products:[],
    product:{} as Product,
    totalProducts:0,
}


export const productsReducer = (state=initialState,action:Action)=>{
    
    switch(action.type){
        
        case 'getProducts':
            return{
                ...state,
                products:action.payload.products,
                totalProducts:action.payload.total
            }

        case 'deleteProduct':
            return{
                ...state,
                products:state.products.filter(p=>p._id !== action.payload),
                totalProducts:state.totalProducts -1,
            }

        case 'getProductsByCategory':
            return{
                ...state,
                products:action.payload
            }

        case 'getSingleProduct':
            return{
                ...state,
                product:action.payload
            }


        default: return state
        
    }


}