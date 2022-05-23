import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

type Props = {
    name:string;
    label:string;
    value:boolean;
    onChange:any;
}


export default function FormSwitch({name,label,value=false,onChange}:Props) {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch checked={value} onChange={onChange} />} label={label} name={name} />
    </FormGroup>
  );
}