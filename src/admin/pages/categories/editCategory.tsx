import * as React from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import { Category } from '../../../utils/types';
import {Grid,Input,Button,Divider} from '@mui/material';
import FormInput from '../../../components/forms/formInput';
import axios from 'axios';

type CategoryError = {
    title:string;
    position:string;
}

const api_url:string | undefined = process.env.REACT_APP_API_URL;


const EditCategory:React.FC = ()=>{

    const navigate:any = useNavigate();
    const location:any = useLocation();
    const [category,setCategory] = React.useState<Category>(location.state);
    const [errors,setErrors] = React.useState<CategoryError>({} as CategoryError);
    const [thumbnail,setThumbnail] = React.useState<string>(category.image);


    const handleChange = (e:any):void=>{
        setCategory({...category,[e.target.name]:e.target.value});
    }

    const handleImage = (e:any):void=>{
        const file = e.target.files[0];
        setCategory({...category,image:file});

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any)=>{
            setThumbnail(e.target.result);
        }
    }

    const validateForm = ():boolean =>{
        let valid = true;
        let error:CategoryError = {} as CategoryError;

        if(!category.title || category.title === ''){
            error.title = "Please Insert a Category Title";
            valid = false;
        }

        if(!category.position){
            error.position = "Please Insert a Category Position";
            valid = false;
        }

        setErrors(error);
        return valid;
    }


    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();

        try{

            const data = new FormData();
            data.append('title',category.title);
            data.append('image',category.image);
            data.append('position',String(category.position));
            if(category.cloudinary_id) data.append('cloudinary_id',category.cloudinary_id);

            const res = await axios.patch(`${api_url}/categories/edit-category/${category._id}`,data);
            alert(res.data.message);
            navigate('/admin/categories');
        }catch(err:any){
            console.log(err?.response.data.message);
        }
    }

    return(
        <div className="new-item-form">
                <h1 className="admin-title">Add New Category</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container style={{display:'flex',justifyContent:'center'}}>
                        <Grid item xs={10} md={5}>
                            <FormInput name='title' label='Title' variant="outlined"  error={errors.title} helperText={errors.title} onChange={handleChange} value={category.title} />
                        </Grid>
                    </Grid>
                    <Grid container style={{display:'flex',justifyContent:'center'}}>
                        <Grid item xs={10} md={5}>
                            <FormInput name='position' label='Position' variant="outlined" type='number'  error={errors.position} helperText={errors.position} onChange={handleChange} value={category.position} />
                        </Grid>
                    </Grid>
                    
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'20px 0'}}>
                        <label htmlFor="contained-button-file">
                                <Input  id="contained-button-file"  type="file" style={{display:'none'}}  onChange={handleImage} />
                                <Button variant="contained" component="span">Upload Image</Button>
                        </label>

                        {thumbnail&& <img src={thumbnail} className="thumbnail-image" alt="category" />  }
                    </div>

                    <Divider style={{marginBottom:'40px'}} />
                    
                    <div className="form-actions">
                        <button onClick={()=>navigate('/admin/categories')} className="btn delete-btn" type="button">Cancel</button>
                        <button  className="btn edit-btn" type="submit">Post</button>
                    </div>

                </form>
        </div>
    )
}



export default EditCategory;