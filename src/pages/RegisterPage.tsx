import { Grid,TextField,Input,Button,Divider,FormControlLabel,Checkbox } from '@mui/material';
import axios from 'axios';
import React, { FormEvent } from 'react'
import FormInput from '../components/forms/formInput';
import { User } from '../utils/types';


type UserErrors = {
    firstName?:string;
    lastName?:string;
    email?:string;
    password?:string;
    confirm?:string;
    terms?:string;
}


const RegisterPage:React.FC = ()=>{

    const [user,setUser] = React.useState<User | any>({});
    const [thumbnail,setThumbnail] = React.useState<string>('');
    const [errors,setErrors] = React.useState<UserErrors>({});
    const [terms,setTerms] = React.useState<boolean>(false);

    const handleChange = (e:any):void=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const handleImage = (e:any):void=>{
        const file = e.target.files[0];
        setUser({...user,image:file});

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any)=>{
            setThumbnail(e.target.result);
        }
    }

    const validate = ():boolean=>{
        let valid:boolean = true;
        let err:UserErrors ={};
        
        if(!user.firstName || user.firstName === ''){
            err.firstName = 'Please insert First Name';
            valid = false;
        }
        if(!user.lastName || user.lastName === ''){
            err.lastName = 'Please insert Last Name';
            valid = false;
        }
        if(!user.email || user.email === ''){
            err.email = 'Please insert email';
            valid = false;
        }
        if(!user.password || user.password === ''){
            err.password = 'Please insert password';
            valid = false;
        }
        if(!user.confirm || user.password !== user.confirm){
            err.confirm = 'Password not match';
            valid = false;
        }

        if(!terms){
            err.terms = 'Please agree to the terms';
            valid = false;
        }
        
        setErrors(err);
        return valid;
    }

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();

        let valid = validate();
        if(valid){   
            const data = new FormData();
            data.append('firstName',user.firstName);
            data.append('lastName',user.lastName);
            data.append('email',user.email);
            data.append('password',user.password);
            if(user.image){
                data.append('image',user.image);
            }
            
            const res = await axios.post(`http://localhost:4000/users/register`,data);
            console.log(res);
            alert(res.data.message);
        }
    }

    return(
        <div className="register-page">
           
       
           <Grid container className="register-container" >

                <Grid item xs={12} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <img src="./images/cupcake-logo.png" alt="cupcake logo" width="50px" />
                    <h1 style={{textAlign:'center'}}>Login</h1>
                </Grid>


               <Grid item xs={11} sm={10}  md={6}  lg={6}>
                    <form className='register-form' onSubmit={handleSubmit}>
                        
                        <Grid container className='form-group'>
                            <Grid item xs={12} md={5}>
                                <FormInput  name='firstName' label='First Name'  error={errors.firstName} helperText={errors.firstName} onChange={handleChange} value={user.firstName} />
                            </Grid>  
                            <Grid item xs={12} md={5}>
                                <FormInput  name='lastName' label='Last Name'  error={errors.lastName} helperText={errors.lastName} onChange={handleChange}value={user.lastName}/>
                            </Grid>  
                        </Grid>
                        
                        <Grid container className='form-group'>
                            <Grid item xs={12}>
                                <FormInput  name='email' label='Email'  error={errors.email} helperText={errors.email} onChange={handleChange} value={user.email}/>
                            </Grid>  
                        </Grid>
                        
                        <Grid container className='form-group'>
                            <Grid item xs={12} md={5}>
                                <FormInput  name='password' label='Password'  error={errors.password} helperText={errors.password} onChange={handleChange} value={user.password} />
                            </Grid>  
                            <Grid item xs={12} md={5}>
                                <FormInput  name='confirm' label='Confirm Password'  error={errors.confirm} helperText={errors.confirm} onChange={handleChange} value={user.confirm} />
                            </Grid>  
                        </Grid>
                        
                        <Grid container style={{marginTop:'50px', textAlign:'center',display:'flex',alignItems:'center'}}>
                            <Grid item xs={6}>
                                <label htmlFor="contained-button-file">
                                    <Input  id="contained-button-file"  type="file" style={{display:'none'}}  onChange={handleImage} />
                                    <Button variant="contained" component="span">Upload Image</Button>
                                </label>
                            </Grid>  
                            {thumbnail && (
                                <Grid item sm={6} style={{display:'flex',justifyContent:'center'}}>
                                    <img src={thumbnail} width="100px" alt="user image" style={{borderRadius:'50%'}} />
                                </Grid>
                            )}
                        </Grid>

                        

                        <Divider  style={{margin:'20px 0'}}/>

                        <Grid container style={{textAlign:'center',marginBottom:'20px',display:'flex',flexDirection:'column'}}>
                            <Grid item xs={12}>
                                <div>
                                <FormControlLabel control={<Checkbox checked={terms} onChange={(e:any)=>setTerms(!terms)}  />} label="i Agree to terms"  />
                                <span>Read</span>
                                </div>
                                {errors.terms && <p style={{color:'red'}}>*{errors.terms}</p>}
                            </Grid>
                        </Grid>


                        <Grid container className='form-group' >
                            <Grid item >
                                <Button variant='outlined' color='error' type="button">Cancel</Button>
                            </Grid>  
                            <Grid item>
                                <Button type="submit" variant="contained" >Sign In</Button>
                            </Grid>  
                        </Grid>

                    </form>
               </Grid>
           </Grid>
            
        </div>
    )
}


export default RegisterPage;
