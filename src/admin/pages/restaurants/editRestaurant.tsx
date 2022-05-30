import { Divider, Grid,Button } from '@mui/material';
import React, { FormEvent } from 'react'
import { Link,useLocation } from 'react-router-dom';
import FormFileInput from '../../../components/forms/formFileInput';
import FormInput from '../../../components/forms/formInput';
import FormSwitch from '../../../components/forms/formSwitch';
import { Restaurant } from '../../../utils/types';
import {useDispatch} from 'react-redux';
import { editRestaurant, postNewRestaurant } from '../../../redux/actions/restaurants.actions';



const EditRestaurant:React.FC = ()=>{

    const location:any = useLocation();
    const dispatch:any = useDispatch();
    const [restaurant,setRestaurent] = React.useState<Restaurant>({...location.state});

    const handleChange = (e:any)=>{
        setRestaurent({...restaurant,[e.target.name]:e.target.value});
    }


    const handleImage = (file:any)=>{
        setRestaurent({...restaurant,image:file})
    }

    const handleSwitch = (e:any):void=>{
        setRestaurent({...restaurant,[e.target.name]:e.target.checked});
    }


    const handleSubmit = (e:FormEvent):void=>{
        e.preventDefault();
        const data = new FormData();

        data.append('city',restaurant.city);
        data.append('address',restaurant.address);
        data.append('phone',restaurant.phone);
        data.append('events',restaurant.events ? String(restaurant.events) : 'false');
        data.append('weekdayOpen',restaurant.weekdayOpen);
        data.append('weekdayClose',restaurant.weekdayClose);
        data.append('friOpen',restaurant.friOpen);
        data.append('friClose',restaurant.friClose);
        data.append('satOpen',restaurant.satOpen);
        data.append('satClose',restaurant.satClose);
        if(restaurant.image){
            data.append('image',restaurant.image);
        }


        dispatch(editRestaurant(data,restaurant._id));


    }

    


    return (
        <div className="new-item-form">
            <h1 className="admin-title">Edit Restaurant</h1>

            <form onSubmit={handleSubmit}>
                <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                    <Grid item xs={12} md={8}>
                        <FormInput name='city' label='City' error='' helperText='' onChange={handleChange} value={restaurant.city} />
                        <FormInput name='address' label='Address' error='' helperText='' onChange={handleChange} value={restaurant.address}  />
                        <FormInput name='phone' label='Phone' error='' helperText='' onChange={handleChange}  value={restaurant.phone} />
                        
                        <Divider />
                        
                        <Grid container style={{backgroundColor:'rgba(0,0,0,0.1)',padding:'10px',margin:'20px 0',display:'flex',justifyContent:'space-between'}}>
                            <Grid item xs={12}>
                                <h3>Opening Hours</h3>
                            </Grid>
                            <Grid item xs={3}>
                                <FormInput name='weekdayOpen' label='Weekday Opening' error='' helperText='' onChange={handleChange} value={restaurant.weekdayOpen}  />     
                                <FormInput name='weekdayClose' label='Weekday Closing' error='' helperText='' onChange={handleChange} value={restaurant.weekdayClose} />     
                            </Grid>
                            <Grid item xs={3}>
                                <FormInput name='friOpen' label='Friday Opening' error='' helperText='' onChange={handleChange} value={restaurant.friOpen} />
                                <FormInput name='friClose' label='Friday Closing' error='' helperText='' onChange={handleChange} value={restaurant.friClose} />
                            </Grid>
                            <Grid item xs={3}>
                                <FormInput name='satOpen' label='Saterday Opening' error='' helperText='' onChange={handleChange} value={restaurant.satOpen} />
                                <FormInput name='satClose' label='Saterday Closing' error='' helperText='' onChange={handleChange} value={restaurant.satClose} />
                            </Grid>
                        </Grid>
                        
                        <Divider />
                        
                        <FormSwitch name='events' label='Events' onChange={handleSwitch} value={restaurant.events} />
                    </Grid>

                    <Divider style={{height:'auto'}} flexItem={false} orientation='vertical'  />
                    
                    <Grid item xs={12} md={3}>
                        <FormFileInput label='Upload Image' name='image' onChange={handleImage} value={restaurant.image}  />
                    </Grid>


                    <Grid item xs={12} style={{margin:'30px 0'}}>
                        <Divider/>
                        <div style={{display:'flex',justifyContent:'space-around',margin:'40px 0'}}>
                        <Link style={{textDecoration:'none'}} to='/admin/restaurants'><Button variant='outlined' color="error">Cancel</Button></Link>
                        <Button variant="contained" type="submit">Save</Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}



export default EditRestaurant;