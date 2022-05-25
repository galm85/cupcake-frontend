import { Action, Order, Product } from "../../utils/types"

export type OrderReducerState = {
    currentOrder:[];
    ordersHistory:Order[];
    totalPriceCurrentOrder:number;
    
}

const initialState:OrderReducerState = {
    currentOrder:[],
    ordersHistory:[],
    totalPriceCurrentOrder:0,
    
}


export const ordersReducer = (state=initialState,action:Action)=>{
    
    switch(action.type){
        
        case 'addItemToOrder':
            return{
                ...state,
                currentOrder:JSON.parse(action.payload.items),
                totalPriceCurrentOrder: action.payload.total
            }


        case 'getCurrentOrder':
            return{
                ...state,
                currentOrder:action.payload.items,
                totalPriceCurrentOrder:action.payload.total
            }
        

        default: return state
        
    }


}