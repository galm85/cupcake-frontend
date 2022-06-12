import React, { FormEvent } from 'react'
import FormInput from '../components/forms/formInput';
import { Button } from '@mui/material';
import { Link,useSearchParams,useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { State, User } from '../utils/types';
import { useSelector } from 'react-redux';
const api = process.env.REACT_APP_API_URL;


const LoginPage:React.FC = ()=>{

    const location:any = useLocation();
    const navigate:any = useNavigate();
    console.log(location.state);
    const [user,setUser] = React.useState<any>({});
    const [errors,setErrors] = React.useState<any>({});
    const [loading,setLoading] = React.useState<boolean>(false);
    const [response,setResponse] = React.useState<string>('');
    const [from,setFrom] = React.useState<string>('');
    const currentUser:User = useSelector((state:State)=>state.usersReducer.currentUser);

    const [searchParams] = useSearchParams();
    

    React.useEffect(()=>{
        if(currentUser){
             return navigate('/');

        };
        if(searchParams.get('url')){
            setFrom(String(searchParams.get('url')));
          }
    },[])


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
                const res = await axios.post(`${api}/users/sign-in`,user);
                setResponse('');
                let token:string = res.data.token;
                sessionStorage.setItem('cupcake',token);
                if(from){
                    navigate(`${from}`,{state:location.state});
                }else{
                    window.location.href = './';
                }

              
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
                    <Button type='button' variant='outlined' color="error" onClick={()=>navigate('/')}>Cancel</Button>
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