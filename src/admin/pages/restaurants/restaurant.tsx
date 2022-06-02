import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Restaurant, State } from '../../../utils/types';
import { getAllRestaurants } from '../../../redux/actions/restaurants.actions';
import { Table, TableBody, TableCell, TableHead, TableRow,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ConfirmDialog from '../../../components/dialogs/confirmDialog';

const RestaurantAdmin:React.FC = ()=>{

    const navigate:any = useNavigate();
    const dispatch:any = useDispatch();
    const restaurants:Restaurant[] = useSelector((state:State)=>state.restaurantsReducer.restaurants);

    React.useEffect(()=>{
        dispatch(getAllRestaurants());
    },[])


    const handleDelete = React.useCallback((id:string)=>{
        alert(id);
    },[])


    return (
        <div className="admin-content">
            <h1 className="admin-title">Restaurants Admin s</h1>
            <Link to='/admin/restaurants/new-restaurant' className='add-new-btn'>New</Link>

            <div className="restaurants-table">
                <Table className="admin-table" style={{margin:'30px 0'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>WeekDay</TableCell>
                            <TableCell>Friday</TableCell>
                            <TableCell>Saterday</TableCell>
                            <TableCell>Events</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants && restaurants.map((restaurant,index:number)=>(
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{restaurant.city}</TableCell>
                                <TableCell>{restaurant.address}</TableCell>
                                <TableCell>{restaurant.phone}</TableCell>
                                <TableCell>{restaurant.weekdayOpen} - {restaurant.weekdayClose}</TableCell>
                                {restaurant.friOpen !== 'undefined' ?  <TableCell>{restaurant.friOpen} - {restaurant.friClose}</TableCell>: <TableCell>Close</TableCell> } 
                                {restaurant.satOpen !== 'undefined' ? <TableCell>{restaurant.satOpen} - {restaurant.satClose}</TableCell> : <TableCell>Close</TableCell> } 
                                <TableCell>{restaurant.events ? <CheckIcon color="success"/> :<DoNotDisturbAltIcon color="error"/>}</TableCell>
                                <TableCell><button onClick={()=>navigate('/admin/restaurants/edit-restaurant',{state:restaurant})} className="btn edit-btn">Edit</button></TableCell>
                                <TableCell> <ConfirmDialog label='Delete' title='Delete this Restaurent?' fc={()=>handleDelete(restaurant._id)} /> </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


export default RestaurantAdmin;