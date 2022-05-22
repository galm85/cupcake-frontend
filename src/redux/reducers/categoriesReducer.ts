import { Action } from "../../utils/types";


export type CategoryReducerState = {
    categories:any[];
}

const initialState:CategoryReducerState = {
   categories:[] 
}



export const categoriesReducer = (state=initialState,action:Action)=>{
    switch(action.type){

        case 'getAllCategories':
            return{
                ...state,
                categories:action.payload
            }

        case 'deleteCategory':
            return{
                ...state,
                categories:state.categories.filter(cat=>cat._id !== action.payload)
            }

        default: return state
    }

}


