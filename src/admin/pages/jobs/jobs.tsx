import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { deleteJob, getAllJobs } from '../../../redux/actions/jobs.actions';
import { State } from '../../../utils/types';


const JobsAdmin:React.FC = ()=>{

    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const jobs = useSelector((state:State)=>state.jobsReducer.jobs);


    React.useEffect(()=>{
        dispatch(getAllJobs());
    },[])

    return(
        <div className="admin-content">
            <h1 className="admin-title">Job Admin</h1>
            <Link to='/admin/jobs/new-job' className="add-new-btn">New</Link>
            <div className="jobs-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Requirements</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs && jobs.map((job,index:number)=>(
                            <TableRow key={job._id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{job.positionTitle}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.description.substring(0,50)} {job.description.length > 50 ? ' ...' : ''}</TableCell>
                                <TableCell>{job.requirement.substring(0,50)} {job.requirement.length > 50 ? ' ...' : ''} </TableCell>
                                <TableCell onClick={()=>navigate('/admin/jobs/edit-job',{state:job})} >Edit</TableCell>
                                <TableCell onClick={()=>dispatch(deleteJob(job._id))}>Delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}



export default JobsAdmin;