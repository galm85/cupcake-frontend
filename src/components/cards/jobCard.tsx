import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../utils/types';
import JobDialog from '../dialogs/jobDialog';

type Props = {
    job:Job;
}

const JobCard:React.FC<Props> = ({job})=>{
    return (
        <div className="job-card">
            <div className="job-card-details">
                <h2>{job.positionTitle} - {job.location}</h2>
                <h4>Description</h4>
                <p>{job.description.substring(0,150)}{job.description.length > 150 ? '...' : ''}</p>
                <h4>Requierment</h4>
                <p>{job.requirement.substring(0,150)}{job.description.length > 150 ? '...' : ''}</p>
            </div>
            <div className="job-card-actions">
                <JobDialog job={job}/>
                <Link style={{textDecoration:'none'}} to={`/careers/apply/${job._id}`}><Button>Apply</Button></Link>
            </div>
        </div>
    )
}


export default JobCard;