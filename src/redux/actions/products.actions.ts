import axios from 'axios';
const api = process.env.REACT_APP_API_URL;


export const getProducts = (page:number,itemsPerPage:number,categoryId:string)=>async(dispatch:any)=>{

   try {
       dispatch({
           type:'setLoading',
           payload:true
       })

       let res:any;

       if(page){
           res = await axios.get(`${api}/products?page=${String(page)}&itemsPerPage=${String(itemsPerPage)}&categoryId=${categoryId}`);
       }else{
           res = await axios.get(`${api}/products`);  
       }
       
       dispatch({
           type:'getProducts',
           payload:res.data,
       })

       dispatch({
        type:'setLoading',
        payload:false
    })
       
   } catch (error) {
        dispatch({
            type:'setLoading',
            payload:false
        })
       console.error(error);
   } 
   

}


export const deleteProduct = (id:string)=>async(dispatch:any)=>{

    try{
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.delete(`${api}/products/${id}`);
        alert(res.data.message);
        dispatch({
            type:'deleteProduct',
            payload:id
        })

        dispatch({
            type:'setLoading',
            payload:false
        })
    }catch(err:any){
        dispatch({
            type:'setLoading',
            payload:false
        })
        console.log(err?.response.data.message);
    }
}



export const getProductsByCategory = (id:string)=>async(dispatch:any)=>{

    try {
        
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res =  await axios.get(`${api}/products/get-products-by-category/${id}`);
        dispatch({
            type:'getProductsByCategory',
            payload:res.data
        })

        dispatch({
            type:'setLoading',
            payload:false
        })

    } catch (error:any) {
        
        console.log(error.response.data.message);
        
        dispatch({
            type:'setLoading',
            payload:false
        })

    }


}


export const getCupcakes= ()=>async(dispatch:any)=>{

    try {
        
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res =  await axios.get(`${api}/products/get-products/get-cupcakes`);
        dispatch({
            type:'getCupcakes',
            payload:res.data
        })

        dispatch({
            type:'setLoading',
            payload:false
        })

    } catch (error:any) {
        
        console.log(error.response.data.message);
        
        dispatch({
            type:'setLoading',
            payload:false
        })

    }


}



export const getSingleProduct = (id:string)=>async(dispatch:any)=>{

    try {
        
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res =  await axios.get(`${api}/products/${id}`);
        dispatch({
            type:'getSingleProduct',
            payload:res.data
        })

        dispatch({
            type:'setLoading',
            payload:false
        })

    } catch (error:any) {
        
        console.log(error.response.data.message);

        dispatch({
            type:'setLoading',
            payload:false
        })

    }


}



export const searchProducts = (value:string)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })
        
        const res = await axios.get(`${api}/products/search/${value}`);
        console.log(res.data);
        dispatch({
            type:'searchProducts',
            payload:res.data,
        })
 
        dispatch({
         type:'setLoading',
         payload:false
     })
        
    } catch (error) {
        console.error(error);
    } 
    
 
 }