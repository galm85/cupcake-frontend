import React, { FormEvent } from 'react'
import FormInput from '../components/forms/formInput';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';


const LoginPage:React.FC = ()=>{

    const [user,setUser] = React.useState<any>({});
    const [errors,setErrors] = React.useState<any>({});
    const [loading,setLoading] = React.useState<boolean>(false);
    const [response,setResponse] = React.useState<string>('');


    const handleChange = (e:any):void => {
        setUser({...user,[e.target.name]:e.target.value});
    }

    const validateForm = ():boolean=>{
        let valid = true;
        let err:any = {};

        if(!user.email || user.email === ''){
            err.email = "Please insert your email address";
            valid = false;
        }
        if(!user.password || user.password === ''){
            err.password = "Please insert your email address";
            valid = false;
        }

        setErrors(err);
        

        return valid;
    }


    const handleSubmit =async (e:FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        let valid = validateForm();
        
        if(valid){
            try{
                const res = await axios.post('http://localhost:4000/users/sign-in',user);
                setResponse('');
                let token:string = res.data.token;
                alert('welcome')
                sessionStorage.setItem('cupcake',token);
                window.location.href ='./';
            }catch(error:any){
               setResponse(error.response.data.message);
            }
        }
        
        
        
        
        setLoading(false);
    }

    return(
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                {loading && <h2>Loading</h2>}
                <h1 className="form-title">Sign In</h1>
                
                {response && <h3 style={{textAlign:'center',color:'red'}}>{response}</h3>}
                
                <FormInput error={errors.email} name="email" label='Email' helperText={errors.email} onChange={handleChange} value={user.email} />
                <FormInput error={errors.password} name="password" label='Password' helperText={errors.password} onChange={handleChange} value={user.password} />
            
                <div style={{display:'flex',justifyContent:'space-around',marginTop:'50px'}}>
                    <Button type='button' variant='outlined' color="error">Cancel</Button>
                    <Button type='submit' variant="contained">Login</Button>
                </div>

            </form>
            
            <div style={{textAlign:'center'}}>
                <Link to='/register'>Don't have an account yet?</Link>
            </div>
        </div>
    )
}


export default LoginPage;