import * as React from 'react';
import {Link, useParams,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { Application, Job } from '../utils/types';
import { Button, Grid, Divider, TextField, Input, Dialog } from '@mui/material';
import FormInput from '../components/forms/formInput';
import FormSelect from '../components/forms/formSelect';
import FormFileInput from '../components/forms/formFileInput';
import ApplicationDialog from '../components/dialogs/applicationDialog';
import { Loading } from '../components';



const api:string | undefined = process.env.REACT_APP_API_URL;
const genderOptions:any[] = [{_id:'male',title:'Male'},{_id:'female',title:'Female'},{_id:'other',title:'Other'}]
const fileTypes:string[] = [".doc",".docx","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/pdf"];


const ApplyPage:React.FC = ()=>{

    const navigate:any = useNavigate();
    const params:any = useParams();
    
    const [job,setJob] = React.useState<Job>({} as Job)
    const [application,setApplication] = React.useState<Application>({} as Application);
    const [fileName,setFileName] = React.useState<string>('');
    const [errors,setErrors] = React.useState<Application>({} as Application);
    const [finishModal,setFinishModal] = React.useState<boolean>(false);
    const [loading,setLoading] = React.useState<boolean>(false);



    React.useEffect(()=>{
        const getJob = async()=>{     
            const res = await axios.get(`${api}/jobs/job-by-id/${params.job_id}`);
            setJob(res.data);
        }
        getJob();
    },[])

    const handleChange = (e:any):void=>{
        setApplication({...application,[e.target.name]:e.target.value})
    }

    const handleFile = (e:any):void=>{
        let file = e.target.files[0];
        if(fileTypes.includes(file.type)){
            setFileName(file.name);
            setApplication({...application,cv:file});
            setErrors({...errors,cv:''})
        }else{
           alert('File not match');
        }
    }

    const validateForm = ():boolean=>{
        let valid = true;
        let error:Application = {} as Application;

        if(!application.firstName || application.firstName === ''){
            error.firstName = "Please Insert First Name";
            valid = false;
        }
        if(!application.lastName || application.lastName === ''){
            error.lastName = "Please Insert Last Name";
            valid = false;
        }
        if(!application.gender || application.gender === ''){
            error.gender = "Please Select Gender";
            valid = false;
        }
        if(!application.phone || application.phone === ''){
            error.phone = "Please insert Phone Number";
            valid = false;
        }
        if(!application.email || application.email === ''){
            error.email = "Please insert Email Address";
            valid = false;
        }
        if(!application.cv){
            error.cv = "Please upload CV file";
            valid = false;
        }

        setErrors(error);

        return valid;
    }

  
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        let valid = validateForm();
        if(valid){
            const data = new FormData();
            data.append('jobId',params.job_id);
            data.append('firstName',application.firstName);
            data.append('lastName',application.lastName);
            data.append('email',application.email);
            data.append('phone',application.phone);
            data.append('gender',application.gender);
            data.append('cv',application.cv);
            try{
                setLoading(true);
                const res = await axios.post(`${api}/applications`,data);
                setLoading(false);
                setFinishModal(true);
            }catch(error){
                console.log(error)
            }
            
        }


    }


    

    return(
       <div className="apply-page">
           {loading && <Loading/>}
           <h1 className='page-title'>Applyment Form</h1>
           {job.positionTitle ? 
           
           <Grid container>
               <ApplicationDialog name={application.firstName ? application.firstName : ''} value={finishModal} />
              
               <Grid item xs={12} md={7}>
                   <form style={{width:'100%'}} onSubmit={handleSubmit}>
                       <Grid container style={{display:'flex',justifyContent:'center'}}>
                           <Grid item xs={12} md={7}>
                                <FormInput name="firstName" label='First Name' error={errors.firstName} helperText={errors.firstName} onChange={handleChange} value={application.firstName}/>
                                <FormInput name="lastName" label='Last Name' error={errors.lastName} helperText={errors.lastName} onChange={handleChange} value={application.lastName}/>
                                <FormSelect name="gender" label='Gender' error={errors.gender} onChange={handleChange} options={genderOptions} value={application.gender}/>
                                <FormInput name="phone" label='Phone' error={errors.phone} helperText={errors.phone} onChange={handleChange} value={application.phone}/>
                                <FormInput name="email" label='Email' error={errors.email} helperText={errors.email} onChange={handleChange} value={application.email}/>
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'20px 0'}}>
                                    <label htmlFor="contained-button-file">
                                        <Input  id="contained-button-file"  type="file" style={{display:'none'}} onChange={handleFile} />
                                        <Button variant="contained" component="span"> Upload CV</Button>
                                    </label>
                                    {errors.cv && <p style={{color:'red'}}>*{errors.cv}</p>}
                                    {fileName && <p>{fileName}</p>}
                                </div>
                           </Grid>
                           
                           <Grid item xs={12}>
                           <Divider style={{margin:'20px 50px'}} />
                           </Grid>

                           <Grid item xs={12} style={{display:'flex',justifyContent:'space-around'}}>
                               
                                <Link style={{textDecoration:'none'}} to='/careers'><Button type="button" variant="outlined">Return</Button></Link>
                                <Button type="submit" variant="contained">Apply</Button>
                           </Grid>
                       </Grid>
                   </form>
               </Grid>
               
               <Grid item xs={12} md={4}>
                   <div className='apply-page-job-description'>
                        <h1>{job.positionTitle}</h1>
                        <h3>Location:{job.location}</h3>
                        <h3>Job Description</h3>
                        <p>{job.description}</p>
                        <h3>Requierments</h3>
                        <p>{job.requirement}</p>
                   </div>
               </Grid>

           </Grid>
           
            :
            <div>
               <h3 className="page-title" style={{fontSize:'20px'}}>The Job Not available anymore</h3>
            </div>
            }
       </div>
    )
}



export default ApplyPage;