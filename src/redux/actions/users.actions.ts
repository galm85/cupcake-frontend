import axios from 'axios';
import { User } from '../../utils/types';
import jwtDecode from 'jwt-decode';

const api = process.env.REACT_APP_API_URL;



export const getUserData = ()=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

       let user:User | null = null;
        if(sessionStorage.getItem('cupcake')){
            user = jwtDecode(String(sessionStorage.getItem('cupcake')));
        }

        dispatch({
            type:'getUserData',
            payload:user
        })


        dispatch({
            type:'setLoading',
            payload:false
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type:'setLoading',
            payload:false
        })
    }

    
}



