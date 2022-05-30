import { Action, Order, Product, Restaurant } from "../../utils/types"

export type RestaurantReducerState = {
    restaurants:Restaurant[];
}

const initialState:RestaurantReducerState = {
    restaurants:[]
}


export const restaurantsReducer = (state=initialState,action:Action)=>{
    
    switch(action.type){


        case 'getAllRestaurants':
            return{
                ...state,
                restaurants:action.payload
            }

        
      
        
        

        default: return state
        
    }


}