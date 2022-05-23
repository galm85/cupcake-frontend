import * as React from 'react';
import {FormHelperText} from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type Props = {
    variant?:any;
    name:string;
    label:string;
    error?:string;
    onChange:any;
    value?:any;
    options:any[];
}




const FormSelect:React.FC<Props> = ({name,label,variant='standard',options,onChange,value,error})=> {
  
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth  variant={variant} error={error ? true : false}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          value={value ? value : ''}
          label={label}
          onChange={onChange}
        >
            {options && options.map((option:any,index:number)=>(
                <MenuItem key={index} value={option._id}>{option.title}</MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

export default FormSelect;
