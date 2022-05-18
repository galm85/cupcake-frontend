import { TextField } from '@mui/material';
import React from 'react'

type Props = {
    variant?:any;
    name:string;
    label:string;
    type?:string;
    error:string | undefined;
    helperText:string | undefined;
    onChange:any;
    value?:any;
}

const FormInput:React.FC<Props> = ({name,label,variant='standard',type='text',error,helperText,onChange,value})=>{

    return(
        <TextField  
            fullWidth 
            variant={variant} 
            name={name} 
            label={label} 
            type={type}
            error={error?true:false} 
            helperText={helperText? "* "+ helperText : ''} 
            onChange={onChange}
            value={value ? value : ''}
        />
    )
}


export default FormInput;