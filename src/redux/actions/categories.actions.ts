import axios from 'axios';
const api = process.env.REACT_APP_API_URL;


export const getAllCategories = ()=>async(dispatch:any)=>{

   try {
       dispatch({
           type:'setLoading',
           payload:true
       })

       const res = await axios.get(`${api}/categories`);
       
       dispatch({
           type:'getAllCategories',
           payload:res.data
       })

       dispatch({
        type:'setLoading',
        payload:false
    })
       
   } catch (error) {
       console.error(error);
   } 
   

}


export const deleteCategory = (id:string)=>async(dispatch:any)=>{

    try{
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.delete(`${api}/categories/${id}`);
        alert(res.data.message);
        dispatch({
            type:'deleteCategory',
            payload:id
        })

        dispatch({
            type:'setLoading',
            payload:false
        })
    }catch(err:any){
        console.log(err?.response.data.message);
    }
}
