import axios from 'axios';
const api = process.env.REACT_APP_API_URL;



export const getAllOrderAsAdmin = ()=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

       
        const res = await axios.get(`${api}/orders/all-orders`);

        dispatch({
            type:'getAllOrderAsAdmin',
            payload:res.data
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




export const placeOrder = (userId:string,orderDetails:any)=>async(dispatch:any)=>{
  
    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res =  await axios.patch(`${api}/orders/place-order/${userId}`,orderDetails);
        alert(res.data.message);
        dispatch({
            type:'placeOrder',
        })



        dispatch({
            type:'setLoading',
            payload:false
        })
        
        window.location.href = './';
        

        
    } catch (error) {
        dispatch({
            type:'setLoading',
            payload:false
        })
    }
}



export const changeOrderStatus = (orderId:string)=>async(dispatch:any)=>{


    try {
        const res = await axios.patch(`${api}/orders/update-status/${orderId}`);
        alert(res.data.message);
        dispatch({
            type:"changeOrderStatus",
            payload:orderId
        })
    } catch (error) {
        console.log(error);
    }
}





export const getAllOrdersPerUser = (userId:string)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

       
        const res = await axios.get(`${api}/orders/get-order-by-user/${userId}`);

        dispatch({
            type:'getAllOrdersPerUser',
            payload:res.data
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




export const updateAmountOfCurrentOrder = (op:string,itemId:string,userId:string)=>async(dispatch:any)=>{
    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res  = await axios.patch(`${api}/orders/update-amount-current-order/${userId}/${itemId}/${op}`)
        
        dispatch({
            type:'updateAmountOfCurrentOrder',
            payload:{items:res.data.items,total:res.data.total}
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
    }
}




export const removeItemFromCurrentOrder = (itemId:string,userId:string)=>async(dispatch:any)=>{
    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res  = await axios.patch(`${api}/orders/remove-item-from-order/${userId}/${itemId}`)
        
        dispatch({
            type:'removeItemFromCurrentOrder',
            payload:{itemId,total:res.data.total}
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
    }
}