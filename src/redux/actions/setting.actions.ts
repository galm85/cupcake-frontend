import axios from 'axios';
const api = process.env.REACT_APP_API_URL;


export const setLoading = (loading:boolean)=>async(dispatch:any)=>{

       dispatch({
           type:'setLoading',
           payload:loading
       })
       
   

}

