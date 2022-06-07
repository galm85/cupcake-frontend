import React from 'react'
import {Button, Dialog, Divider} from '@mui/material';
import { Job, LegalData } from '../../utils/types';
import {useNavigate} from 'react-router-dom';



type Props = {
    legalData:LegalData;
}


const LegalDialog:React.FC<Props> = ({legalData})=>{

    const navigate:any = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = ():void=>{
        setOpen(false);
    }

   

    return (
       <div>
           <Button onClick={()=>setOpen(true)}><span className='legal-dialog-link'>{legalData.label}</span></Button>
           <Dialog onClose={handleClose} open={open}>
               <div className="legal-dialog">
                    <h2>{legalData.label}</h2>
                    <p>{legalData.text}</p>
                    <div className="legal-dialog-action">
                        <Button onClick={()=>handleClose()}>Close</Button>
                    </div>
               </div>
           </Dialog>
       </div>
    )
}


export default LegalDialog;