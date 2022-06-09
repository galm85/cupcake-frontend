import { Action, CurrentOrder, Order, Product } from "../../utils/types"

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


        case 'getAllOrderAsAdmin':
            return{
                ...state,
                ordersHistory:action.payload
            }

        
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

        case 'placeOrder':
            return{
                ...state,
                currentOrder:[],
                totalPriceCurrentOrder:0
            }


        case 'changeOrderStatus':
            return{
                ...state,
                ordersHistory:state.ordersHistory.map(order=>{
                    if(order._id === action.payload){
                        order.status = 'deliverd'
                        return order;
                    }
                    else{
                        return order;
                    }
                })
            }


        
            case 'getAllOrdersPerUser':
                return{
                    ...state,
                    ordersHistory:action.payload
                }


            case 'updateAmountOfCurrentOrder':
               
                return{
                    ...state,
                    currentOrder:action.payload.items,
                    totalPriceCurrentOrder:action.payload.total
                }

            case 'removeItemFromCurrentOrder':
               
                return{
                    ...state,
                    currentOrder:state.currentOrder.filter((item:CurrentOrder)=>item._id !== action.payload.itemId),
                    totalPriceCurrentOrder:action.payload.total
                }
        
        

        default: return state
        
    }


}