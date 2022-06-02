import { Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material';
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../components/dialogs/confirmDialog';
import { deleteJob, getAllJobs } from '../../../redux/actions/jobs.actions';
import { State } from '../../../utils/types';


const JobsAdmin:React.FC = ()=>{

    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const jobs = useSelector((state:State)=>state.jobsReducer.jobs);


    React.useEffect(()=>{
        dispatch(getAllJobs());
    },[])

    const handleDelete = React.useCallback((id:string)=>{
        dispatch(deleteJob(id));
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
                            <TableCell>Applications</TableCell>
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
                                <TableCell onClick={()=>navigate('/admin/jobs/edit-job',{state:job})} ><Button color='warning'>Edit</Button></TableCell>
                                <TableCell><ConfirmDialog label='Delete'  title="Delete this Job?"  fc={()=>handleDelete(job._id)}/></TableCell>
                                <TableCell onClick={()=>navigate(`/admin/jobs/applications/${job._id}`,{state:job})} ><Button>Applications</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        
            
        </div>
    )
}



export default JobsAdmin;