import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import {useLocation} from 'react-router-dom';
import { Application, Job } from '../../../utils/types';


const getApplications =  async(jobId:string)=>{
    try{

        const api = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${api}/applications/applications-by-job/${jobId}`);
        return res.data;
    }catch(error){
        console.log(error);
        return [];
    }
}


const ApplicationsAdmin:React.FC = ()=>{

    const location:any = useLocation();
    const [job] = React.useState<Job>(location.state);
    const [applications,setApplications] = React.useState<Application[]>([]);
    const [loading,setLoading] = React.useState<boolean>(false);


    React.useEffect(()=>{
        if(job){
            setLoading(true);
            getApplications(job._id).then(data=>setApplications(data)).then(()=>setLoading(false))  
        }
    },[])
    

    return (
        <div className="admin-content">
                <h1 className="admin-title">Applications</h1>
                <Grid container>
                    
                    <Grid item xs={12}>
                        <h4 className="applications-job-description">Position: {job.positionTitle} | locations:{job.location} | ID:{job._id}</h4>
                    </Grid>

                    <Grid item xs={12}>
                        <Table className='admin-table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>CV</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applications && applications.map((application,index:number)=>(
                                    <TableRow key={application._id}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{new Date(application.createdAt).toDateString()}</TableCell>
                                        <TableCell>{application.firstName + ' ' + application.lastName}</TableCell>
                                        <TableCell>{application.gender}</TableCell>
                                        <TableCell>{application.phone}</TableCell>
                                        <TableCell>{application.email}</TableCell>
                                        <TableCell><Button> <a href={application.cv} download>CV</a> </Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    
                </Grid>
        </div>
    )
}


export default ApplicationsAdmin;