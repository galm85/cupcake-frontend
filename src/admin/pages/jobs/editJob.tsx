import React, { FormEvent } from 'react'
import { Grid,FormControl,InputLabel,Select,MenuItem,FormHelperText, TextField, Button } from '@mui/material';
import FormInput from '../../../components/forms/formInput';
import { Job, Restaurant, State } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../../redux/actions/restaurants.actions';
import { Link, useLocation } from 'react-router-dom';
import { editJob, postNewJob } from '../../../redux/actions/jobs.actions';


const EditJob:React.FC = ()=>{

    const location:any = useLocation();
    const dispatch:any = useDispatch();
    const [job,setJob] = React.useState<Job>({...location.state});
    const [jobError,setJobError] = React.useState<Job>({}as Job);
    const restaurants:Restaurant[] = useSelector((state:State)=>state.restaurantsReducer.restaurants);


    React.useEffect(()=>{
        dispatch(getAllRestaurants());
    },[])


    const handleChange = (e:any):void=>{
        setJob({...job,[e.target.name]:e.target.value});
    }


    const validateForm = ():boolean=>{
        let valid = true;
        let error:Job = {} as Job;

        if(!job.positionTitle || job.positionTitle === ''){
            error.positionTitle = 'Please Insert a Position Title';
            valid = false;
        }

        if(!job.location || job.location === ''){
            error.location = 'Please Select the location of the position';
            valid = false;
        }

        if(!job.description || job.description === ''){
            error.description = '* Please insert the job description';
            valid = false;
        }

        if(!job.requirement || job.requirement === ''){
            error.requirement = '* Please insert the job requirement';
            valid = false;
        }

        setJobError(error);
        return valid;
    }

   

    const handleSubmit = (e:FormEvent):void=>{
        e.preventDefault();
        let valid = validateForm();
        if(valid){
            dispatch(editJob(job,job._id));
        }

    }


    return(
        <div className="new-job-page">
            <h1 className='admin-title'>Edit Job</h1>
         
            <form onSubmit={handleSubmit} >
                <Grid container rowSpacing={4} style={{display:'flex',justifyContent:'center'}}>
                    
                    <Grid item xs={12} sm={7}>
                        <FormInput name='positionTitle' label='Position Title' onChange={handleChange} error={jobError.positionTitle} helperText={jobError.positionTitle} value={job.positionTitle} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                            <FormControl fullWidth  variant='standard' error={jobError.location ? true : false} >
                                <InputLabel id='location'>location</InputLabel>
                                <Select labelId='location' id='location' name='location' value={job.location} label='location' onChange={handleChange}>
                                    <MenuItem  value='Headcourts'>Headcourts</MenuItem>
                                    {restaurants && restaurants.map((restaurant)=>(
                                        <MenuItem key={restaurant._id}  value={restaurant.city}>{restaurant.city}</MenuItem>
                                        ))}
                                </Select>
                                {jobError.location &&  <FormHelperText >{"* "+jobError.location}</FormHelperText> }
                               
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField name="description" label="Description" onChange={handleChange} multiline rows={5} fullWidth value={job.description} error={jobError.description ? true : false} helperText={jobError.description}/>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField name="requirement" label="Requirement" onChange={handleChange} multiline rows={5} fullWidth value={job.requirement} error={jobError.requirement ? true : false} helperText={jobError.requirement}/>
                    </Grid>

                    <Grid item xs={12} sm={7} style={{display:'flex',justifyContent:'space-around'}}>
                        <Link to='/admin/jobs' style={{textDecoration:'none'}}><Button variant="outlined" color='error'>Cancel</Button></Link>
                        <Button type="submit" variant="contained">Post</Button>
                    </Grid>

                </Grid>
            </form>
            
        </div>
    )
}

export default EditJob;