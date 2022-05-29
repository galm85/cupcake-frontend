import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getAllOrderAsAdmin } from '../../../redux/actions/orders.actions';
import { Order, State } from '../../../utils/types';
import OrderDialog from '../../components/orderDialog';



const OrdersAdmin:React.FC = ()=>{


    const dispatch:any = useDispatch();
    const orders:Order[] = useSelector((state:State)=>state.ordersReducer.ordersHistory);

    React.useEffect(()=>{
        dispatch(getAllOrderAsAdmin());
    },[])

    return(
        <div className="admin-content">
            <h1 className='admin-title'>Orders Managment</h1>

            <Grid container>
                <Table className="admin-table orders-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Order Id</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.map((order:Order)=>(
                            <TableRow key={order._id}  className={order.status === 'in progress' ? "order-in-progress" : ""}>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()} - {new Date(order.createdAt).toLocaleTimeString()}</TableCell>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.totalAmount}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <OrderDialog order={order} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </div>
        
    )
}


export default OrdersAdmin;