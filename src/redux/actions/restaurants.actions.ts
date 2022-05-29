import axios from 'axios';
import { Restaurant } from '../../utils/types';
const api = process.env.REACT_APP_API_URL;



export const postNewRestaurant = (data:FormData)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

       
        const res = await axios.post(`${api}/restaurants`,data);
        alert(res.data.message);
        window.location.href = './admin/restaurants';
        


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



