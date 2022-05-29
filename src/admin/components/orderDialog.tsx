import { Button, Dialog, Grid, Table, TableHead, TableRow,TableCell,TableBody } from '@mui/material'
import React from 'react'
import { Order,CurrentOrder } from '../../utils/types';
import {useDispatch} from 'react-redux';
import { changeOrderStatus } from '../../redux/actions/orders.actions';

type Props = {
    order:Order;
}

const OrderDialog:React.FC<Props> = ({order})=>{

    const dispatch:any = useDispatch();
    const [open,setOpen] = React.useState<boolean>(false);
    const [orderDetails,setOrderDetails] = React.useState<CurrentOrder[]>([]);

    const handleOpen = ():void=>{
        setOpen(true);
    }
    const handleClose = ():void=>{
        setOpen(false);
    }


    const handleStatusChange = (orderId:string)=>{
        dispatch(changeOrderStatus(orderId));
        setOpen(false);
    }


    React.useEffect(()=>{
        setOrderDetails(JSON.parse(order.items));
    },[])

    return (
        <div className="order-dialog">
            <Button onClick={handleOpen}>Open</Button>
            <Dialog open={open} onClose={handleClose} >
               <Grid container style={{padding:'50px'}} >
                    <Grid item xs={12} md={6} className="client-information">
                        <p><b>Order ID:</b> {order._id}</p>
                        <p><b>Contact Name:</b> {order.contactPerson}</p>
                        <p><b>Address:</b> {order.address}</p>
                        <p><b>city:</b> {order.city}</p>
                        <p><b>Phone:</b> {order.phone}</p>
                    </Grid>
                    <Grid item xs={12} md={6} className="payment-information">
                        <p><b>Order Amount:</b> ${order.totalAmount}</p>
                        <p><b>Payment Method:</b> {order.paymentMethod}</p>
                        {order.paymentMethod === 'Credit Card' && (
                            <>
                                <p><b>creditCard:</b> {order.creditCard}</p>
                                <p><b>Card Number:</b> **** **** **** 4543</p>
                                <p><b>CCV:</b> 345</p>
                                <p><b>Exprire Date</b> 02/2022</p>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetails.map((item:CurrentOrder,index:number)=>(
                                    <TableRow key={item._id}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                    </Grid>
                    <Grid item xs={12} style={{padding:'50px'}}>
                        {order.status === 'in progress' ?
                        <Button color="primary" variant='contained'  onClick={()=>{handleStatusChange(order._id)}} fullWidth>Ready</Button>
                        :
                        <Button color="primary" variant='contained' disabled fullWidth>Order Deliverd</Button>
                    }
                    </Grid>
               </Grid>
                
            </Dialog>
        </div>
    )
}


export default OrderDialog;