import { Grid } from '@mui/material';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import BreadCrumbs from '../components/Breadcrumbs';
import JobCard from '../components/cards/jobCard';
import { getAllJobs } from '../redux/actions/jobs.actions';
import { Job, State } from '../utils/types';



const CareersPage:React.FC = ()=>{


    const dispatch:any = useDispatch();
    const jobs:Job[] = useSelector((state:State)=>state.jobsReducer.jobs);

    React.useEffect(()=>{
        dispatch(getAllJobs());
    },[])

    return(
        <div className="careers-page">
            <BreadCrumbs currentPage='Careers' links={[{label:'Home',link:'/'}]}/>
            <h1 className="page-title">Come work with us</h1>

            <Grid container spacing={5} style={{display:'flex',justifyContent:'space-around'}}>
                {jobs && jobs.map((job)=>(
                    <Grid item xs={10} md={4} key={job._id}>
                        <JobCard job={job}/>
                    </Grid>

                ))}

            </Grid>

        </div>
    )
}



export default CareersPage;