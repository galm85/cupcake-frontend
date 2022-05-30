import { Action,JobReducer } from "../../utils/types"



const initialState:JobReducer = {
    jobs:[]
}


export const jobsReducer = (state=initialState,action:Action)=>{
    
    switch(action.type){


        case 'getAllJobs':
            return{
                ...state,
                jobs:action.payload
            }

        case 'deleteJob':
            return{
                ...state,
                jobs:state.jobs.filter(j=>j._id !== action.payload)
            }
      
        
        

        default: return state
        
    }


}