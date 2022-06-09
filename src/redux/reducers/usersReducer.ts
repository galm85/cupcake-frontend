import jwtDecode from 'jwt-decode';

type Action= {
    type:string;
    payload?:any;
}


export type UserReducerState = {
    currentUser:any | null;
}

const initialState:UserReducerState = {
    currentUser: sessionStorage.getItem('cupcake') ? jwtDecode(String(sessionStorage.getItem('cupcake'))) : null,
}



export const usersReducer = (state=initialState,action:Action)=>{
    switch(action.type){

        case 'getUserData':
            return{
                ...state,
                currentUser:action.payload
            }
        default: return state
    }

}