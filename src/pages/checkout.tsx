import { Button, Divider, Grid } from '@mui/material';
import React, { FormEvent } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import FormInput from '../components/forms/formInput';
import FormSelect from '../components/forms/formSelect';
import { placeOrder } from '../redux/actions/orders.actions';
import { Order, State, User,CurrentOrder } from '../utils/types';



const paymentMethods = [
    {_id:"Credit Card",title:'Credit Card'},
    {_id:"Cash",title:'Cash'},
    
]

const creditCards = [
    {_id:'Master Card',title:'Master Card'},
    {_id:'Visa',title:'Visa'},
    {_id:'American Express',title:'American Express'},
    {_id:'Direct',title:'Direct'},
]

const years = [
    {_id:'2022',title:'2022'},
    {_id:'2023',title:'2023'},
    {_id:'2024',title:'2024'},
    {_id:'2025',title:'2025'},
    {_id:'2026',title:'2026'},
]

const months = [
    {_id:'Jan',title:'Jan'},
    {_id:'Feb',title:'Feb'},
    {_id:'Mar',title:'Mar'},
    {_id:'Apr',title:'Apr'},
    {_id:'May',title:'May'},
    {_id:'Jun',title:'Jun'},
    {_id:'Jul',title:'Jul'},
    {_id:'Aug',title:'Aug'},
    {_id:'Sep',title:'Sep'},
    {_id:'Oct',title:'Oct'},
    {_id:'Nov',title:'Nov'},
    {_id:'Dec',title:'Dec'},
]

type OrderDetails = {
    userId?:string;
    items?:string;
    isActive?:boolean;
    totalAmount?:number;
    contactPerson?:string;
    address?:string,
    city?:string,
    phone?:string,
    paymentMethod?:string,
    creditCard?:string,
    creditCardNumber:string,
    month:string,
    year:string,
    ccv:number,
}


const CheckoutPage:React.FC = ()=>{

    const dispatch:any = useDispatch();
    const user:User = useSelector((state:State)=>state.usersReducer.currentUser);
    const order:CurrentOrder[] = useSelector((state:State)=>state.ordersReducer.currentOrder);
    const total:String = useSelector((state:State)=>state.ordersReducer.totalPriceCurrentOrder);
    const [orderDetails,setOrderDetails] = React.useState<OrderDetails>({contactPerson:user.firstName+" "+user.lastName} as OrderDetails);
    const [errors,setErrors]  = React.useState<any>({});


    const handleChange = (e:any):void=>{
        setOrderDetails({...orderDetails,[e.target.name]:e.target.value})
    }

    const validateForm = ():boolean=>{
        let valid = true;
        let error:any ={};

        if(!orderDetails.contactPerson || orderDetails.contactPerson === ""){
            error.contactPerson = 'Please Insert Contact Name';
            valid = false;
        }

        if(!orderDetails.address || orderDetails.address === ""){
            error.address = 'Please Insert an Address';
            valid = false;
        }
        if(!orderDetails.city || orderDetails.city === ""){
            error.city = 'Please Insert City name';
            valid = false;
        }
        if(!orderDetails.phone || orderDetails.phone === ""){
            error.phone = 'Please Insert a phone number';
            valid = false;
        }

        if(!orderDetails.paymentMethod || orderDetails.paymentMethod === ""){
            error.paymentMethod = 'Please Select a payment method';
            valid = false;
        }

        if(orderDetails.paymentMethod === 'Credit Card' &&  (!orderDetails.creditCard || orderDetails.creditCard === "")){
            error.creditCard = 'Please insert select Credit card';
            valid = false;
        }

        if(orderDetails.paymentMethod === 'Credit Card' && (!orderDetails.creditCardNumber || orderDetails.creditCardNumber === "")){
            error.creditCardNumber = 'Please insert the Credit card number';
            valid = false;
        }

        if(orderDetails.paymentMethod === 'Credit Card'  &&  (!orderDetails.ccv || orderDetails.ccv >999 || orderDetails.ccv < 100)){
            error.ccv = 'Please insert a valid CCV number';
            valid = false;
        }

        if(orderDetails.paymentMethod === 'Credit Card' && (!orderDetails.month || orderDetails.month === "")){
            error.month = 'Please Select the expired month of the Credit card';
            valid = false;
        }

        if(orderDetails.paymentMethod === 'Credit Card' && (!orderDetails.year || orderDetails.year === "")){
            error.year = 'Please Select the expired year of the Credit card';
            valid = false;
        }

        setErrors(error);
        return valid;
    }


    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
      
        let valid = validateForm();

        if(valid){
            const data:any = {
                totalAmount:total,
                contactPerson:orderDetails.contactPerson,
                address:orderDetails.address,
                city:orderDetails.city,
                phone:orderDetails.phone,
                paymentMethod:orderDetails.paymentMethod,
                creditCard:orderDetails.creditCard,
            }
            await dispatch(placeOrder(user._id,data));
        }


    }


    return (
        <div className="checkout-page">
            <h1 className="page-title">Checkout</h1>
            <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                
                <Grid item xs={12} md={7}>
                    <form onSubmit={handleSubmit}>
                        <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                                <Grid item xs={12} md={5}>
                                    <FormInput name='contactPerson' label='Contact Person' error={errors.contactPerson} onChange={handleChange} helperText={errors.contactPerson} value={orderDetails.contactPerson}/>
                                    <Grid container style={{display:'flex',justifyContent:'space-between'}}>
                                        <Grid item xs={7}>
                                            <FormInput name='address' label='Address' error={errors.address} onChange={handleChange} helperText={errors.address} value={orderDetails.address}/>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormInput name='city' label='City' error={errors.city} onChange={handleChange} helperText={errors.city} value={orderDetails.city}/>
                                        </Grid>
                                    </Grid>
                                    <FormInput name='phone' label='Phone' error={errors.phone} onChange={handleChange} helperText={errors.phone} value={orderDetails.phone}/>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <FormSelect name="paymentMethod" label='Payment Method' onChange={handleChange} options={paymentMethods} error={errors.paymentMethod} value={orderDetails.paymentMethod} />
                                    
                                    {orderDetails.paymentMethod === 'Credit Card' &&
                                    
                                    <>
                                    <FormSelect name="creditCard" label='Credit card' onChange={handleChange} options={creditCards} error={errors.creditCard} value={orderDetails.creditCard} />
                                    <FormInput name="creditCardNumber" label='Credit card Number' onChange={handleChange} helperText={errors.creditCardNumber} error={errors.creditCardNumber} value={orderDetails.creditCardNumber} />
                                    <FormInput name='ccv' label='CCV' error={errors.ccv} onChange={handleChange} helperText={errors.ccv} value={orderDetails.ccv}/>
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <FormSelect name="month" label='Month' onChange={handleChange} options={months} error={errors.month} value={orderDetails.month} />
                                            <FormSelect name="year" label='Year' onChange={handleChange} options={years} error={errors.year} value={orderDetails.year} />
                                        </div>
                                    </>
                                    }
                                    
                                </Grid>
                                <Grid item xs={12} className='checkout-page-submit' >
                                    <Button type="submit" fullWidth color='warning' variant="contained">Place Order</Button>
                                </Grid>
                        </Grid>
                    </form>
                </Grid>
                
                <Grid xs={12} md={4}>
                    <h2 style={{textAlign:"center"}}>My Order</h2>
                    <div className="checkout-order-list">
                        {order && order.map((item:CurrentOrder)=>(
                            <div key={item._id} className="checkout-order-list-item">
                                <img src={item.image} alt={item.title}  />
                                <p className="item-name">{item.title}  </p>
                                <p>${item.price} X {item.amount} = ${item.amount*item.price}</p>
                            </div>
                        ))}
                        <Divider/>
                       <p className="total"> Total: ${total}</p>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}


export default CheckoutPage;