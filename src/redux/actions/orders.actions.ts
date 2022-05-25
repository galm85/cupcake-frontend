import axios from 'axios';
const api = process.env.REACT_APP_API_URL;


export const addItemToOrder = (item:any,userId:string)=>async(dispatch:any)=>{

   try {
       dispatch({
           type:'setLoading',
           payload:true
       })


       const res:any = await axios.patch(`${api}/orders/current-order/${userId}`,item);
       alert(res.data.message);
       
       
       dispatch({
           type:'addItemToOrder',
           payload:res.data,
       })

       dispatch({
        type:'setLoading',
        payload:false
    })
       
   } catch (error) {
       console.error(error);
       dispatch({
        type:'setLoading',
        payload:false
    })
   } 
   

}





export const getCurrentOrder = (userId:string)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res:any  = await axios.get(`${api}/orders/current-order/${userId}`);
        dispatch({
            type:'getCurrentOrder',
            payload:res.data
        })

        dispatch({
            type:'setLoading',
            payload:false
        })
 
    } catch (error) {
        console.error(error);
        dispatch({
            type:'setLoading',
            payload:false
        })
    }
}

