import { Action, Product } from "../../utils/types"

export type ProductReducerState = {
    products:Product[];
    product:Product;
}

const initialState:ProductReducerState = {
    products:[],
    product:{} as Product,
}


export const productsReducer = (state=initialState,action:Action)=>{
    
    switch(action.type){
        
        case 'getProducts':
            return{
                ...state,
                products:action.payload
            }

        case 'deleteProduct':
            return{
                ...state,
                products:state.products.filter(p=>p._id !== action.payload)
            }


        default: return state
        
    }


}