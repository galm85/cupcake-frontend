import { Grid } from '@mui/material';
import { borderRadius, height } from '@mui/system';
import * as React from 'react';


type Props = {
    image:string;
}


const CupcakeCard = ({image}:Props)=>{
    return(
        <Grid item xs={4}>
            <img 
                src={`./images/${image}`} alt="cupcake image" 
                style={{
                    width: '200px',
                    height:'200px',
                    objectFit:'cover',
                    borderRadius:'50%',
                }}
                />
        </Grid>
    )
}

export default CupcakeCard