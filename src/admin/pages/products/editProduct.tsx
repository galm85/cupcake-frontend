import { Grid, TextField,InputLabel, Divider } from '@mui/material';
import React, { FormEvent } from 'react'
import FormInput from '../../../components/forms/formInput';
import FormSelect from '../../../components/forms/formSelect';
import { getAllCategories } from '../../../redux/actions/categories.actions';
import { Product, State } from '../../../utils/types';
import { useDispatch,useSelector } from 'react-redux';
import FormSwitch from '../../../components/forms/formSwitch';
import FormFileInput from '../../../components/forms/formFileInput';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';


const api_url:string | undefined = process.env.REACT_APP_API_URL;


const EditProduct:React.FC = ()=>{

    const dispatch:any = useDispatch();
    const navigate:any = useNavigate();
    const location:any = useLocation();

    const [product,setProduct]  = React.useState<Product>(location.state);
    const [errors,setErrors] = React.useState<any>({});
    const {categories} = useSelector((state:State)=>state.categoriesReducer);

    React.useEffect(()=>{
        dispatch(getAllCategories());
    },[])

    const handleChange = (e:any):void =>{
        setProduct({...product,[e.target.name]:e.target.value});
    }

    const handleImage = (file:any):void=>{
        setProduct({...product,image:file});
    }

    const handleSwitch = (e:any):void=>{
        setProduct({...product,[e.target.name]:e.target.checked});
    }


    const validateForm = ():boolean=>{
        let valid:boolean = true;
        let err:any = {}; 

        if(!product.title || product.title === ''){
            err.title = 'Please Insert a Product title';
            valid = false;
        }

        if(!product.category || product.category === ''){
            err.category = 'Please Select Category';
            valid = false;
        }

        if(!product.price){
            err.price = 'Please Insert the Product Price';
            valid = false;
        }

        if(!product.position){
            err.position = 'Please Insert the Product Position';
            valid = false;
        }

        if(!product.description || product.description === ''){
            err.description = "Please Insert the Product's Description";
            valid = false;
        }

        setErrors(err);
        return valid;
    }

    const handleSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        let valid = validateForm();
        if(valid){
           const data = new FormData();
           data.append('title',product.title);
           data.append('category',String(product.category));
           data.append('price',String(product.price));
           data.append('position',String(product.position));
           data.append('description',product.description);
           data.append('image',product.image);
           data.append('isVegan',String(product.isVegan));
           data.append('isGlutenFree',String(product.isGlutenFree));
       
            const res = await axios.patch(`${api_url}/products/edit-product/${product._id}`,data);
            alert(res.data.message);
            navigate('/admin/products');

        }
    }




    return(
        <div className="new-item-form">

            <h1 className="admin-title">Edit Product</h1>

                    <form onSubmit={handleSubmit}>
                        <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                            <Grid item xs={12} md={8} lg={8}>
                                    <Grid container className="inputs-container">
                                        <Grid item xs={12} md={8}>
                                            <FormInput name='title' label='Title' error={errors.title} helperText={errors.title} onChange={handleChange} value={product.title} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <FormSelect name='category' label='Category' error={errors.category} options={categories} onChange={handleChange} value={product.category} />
                                        </Grid>
                                    </Grid>
                                    <Grid container className="inputs-container">
                                        <Grid item xs={12} md={6}>
                                            <FormInput name='price' label='Price' error={errors.price} helperText={errors.price} onChange={handleChange} type="number" value={product.price} />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <FormInput name='position' label='Position' error={errors.position} helperText={errors.position} onChange={handleChange} type="number" value={product.position}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container style={{margin:'30px 0'}}>
                                        <InputLabel error={errors.description}>Description</InputLabel>
                                        <Grid item xs={12}>
                                            <TextField multiline fullWidth rows={5} onChange={handleChange} name="description" value={product.description} error={errors.description ? true : false} helperText={errors.description? "* "+errors.description : null}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormSwitch name="isVegan" label="Vegan" value={product.isVegan} onChange={handleSwitch}/>
                                            <FormSwitch name="isGlutenFree" label="Gluten Free" value={product.isGlutenFree} onChange={handleSwitch}/>
                                        </Grid>
                                    </Grid>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3} style={{borderLeft:'1px solid black',}}>
                                <FormFileInput label="Upload Image" name='image' onChange={handleImage} value={product.image} />
                            </Grid>
                        </Grid>
                        <Divider style={{margin:'40px 0'}} />
                        <Grid container>
                            <Grid item xs={12} style={{display:'flex',justifyContent:'space-around'}}>
                                <button type='button' className='btn delete-btn'>Cancel</button>
                                <button type='submit' className='btn edit-btn'>Save</button>
                            </Grid>
                        </Grid>
                    </form>
            

        </div>
    )
}

export default EditProduct;