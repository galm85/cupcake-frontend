import React from 'react'
import {Button, Dialog, Divider} from '@mui/material';
import { Job } from '../../utils/types';
import {useNavigate} from 'react-router-dom';



type Props = {
    job:Job;
}


const JobDialog:React.FC<Props> = ({job})=>{

    const navigate:any = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = ():void=>{
        setOpen(false);
    }

    const handleApply = ():void=>{
        navigate(`/careers/apply/${job._id}`);
    }

    return (
       <div>
           <Button onClick={()=>setOpen(true)}>More</Button>
           <Dialog onClose={handleClose} open={open}>
               <div className="job-dialog">
                   <h1>{job.positionTitle}</h1>
                   <h3>Location: {job.location}</h3>
                   <h4>Description</h4>
                   <p>{job.description}</p>
                   <h4>Requierments</h4>
                   <p>{job.requirement}</p>
                   <Divider style={{margin:'20px 0'}}/>
                   <div className="job-dialog-actions">
                       <Button variant='contained' onClick={()=>handleClose()}>Close</Button>
                       <Button onClick={()=>handleApply()}>Apply</Button>
                   </div>
               </div>
        
           </Dialog>
       </div>
    )
}


export default JobDialog;