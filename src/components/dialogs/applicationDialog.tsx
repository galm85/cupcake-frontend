import * as React from 'react';
import {Button, Dialog} from '@mui/material';
import {useNavigate} from 'react-router-dom';

type Props = {
    name:string;
    value:boolean;
}


const ApplicationDialog:React.FC<Props> = ({name,value})=>{

    const navigate:any= useNavigate();
    
    
    const handleClose = ():void=>{
        navigate('/careers');
    }

    return (
        <Dialog open={value} onClose={handleClose} maxWidth="xl" >
            <div className="application-dialog">
                <h1>Thank You {name}</h1>
                <p>We received your information and will contact you if there is a good match</p>
                <p>Regards,<br/>The CupCake's hiring team</p>
                <img src="/images/cupcake-logo.png" alt="logo" />
                <div style={{display:'flex',justifyContent:'center',margin:'20px 0'}}>
                    <Button variant="contained" color="success" onClick={()=>handleClose()}>Close</Button>
                </div>
            </div>
        </Dialog>
    )
}


export default React.memo(ApplicationDialog);