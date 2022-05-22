import { Action } from "../../utils/types";


export type SettingState = {
    loading:boolean;
    error:string | null;
}

const initialState:SettingState = {
   loading:false,
   error:null,
}



export const settingReducer = (state=initialState,action:Action)=>{
    switch(action.type){

        case 'setLoading':
            return{
                ...state,
                loading:action.payload
            }

        case 'setError':
            return{
                ...state,
                loading:action.payload
            }


        default: return state
    }

}