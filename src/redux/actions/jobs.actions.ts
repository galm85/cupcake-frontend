import axios from 'axios';
import { Job, Restaurant } from '../../utils/types';
const api = process.env.REACT_APP_API_URL;






export const getAllJobs = ()=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.get(`${api}/jobs`);
        
        dispatch({
            type:'getAllJobs',
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




export const postNewJob = (data:Job)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.post(`${api}/jobs`,data);
        alert(res.data.message);
        window.location.href = '/admin/jobs';

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

export const editJob = (data:Job,jobId:string)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.patch(`${api}/jobs/edit-job/${jobId}`,data);
        alert(res.data.message);
        window.location.href = '/admin/jobs';

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
export const deleteJob = (jobId:string)=>async(dispatch:any)=>{

    try {
        dispatch({
            type:'setLoading',
            payload:true
        })

        const res = await axios.delete(`${api}/jobs/delete-job/${jobId}`);
        alert(res.data.message);
        dispatch({
            type:'deleteJob',
            payload:jobId,
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




