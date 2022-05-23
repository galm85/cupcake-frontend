import React from 'react'
import {Input,Button} from '@mui/material';


type Props = {
    label:string;
    onChange:any;
    name:string;
}


const FormFileInput:React.FC<Props> = ({label,onChange,name})=>{


    const [thumbnail,setThumbnail] = React.useState<string>('');

    const handleFile = (e:any):void=>{
        const file = e.target.files[0];
        onChange(file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any)=>{
            setThumbnail(e.target.result);
        }
    }

    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'20px 0'}}>
        <label htmlFor="contained-button-file">
                <Input  id="contained-button-file"  type="file" style={{display:'none'}} name={name}  onChange={handleFile} />
                <Button variant="contained" component="span">{label}</Button>
        </label>

        {thumbnail&& <img src={thumbnail} className="thumbnail-image" alt="category" />  }
    </div>
    )
}


export default FormFileInput;