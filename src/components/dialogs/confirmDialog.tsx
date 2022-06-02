import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



type Props = {
    label:string;
    title:string;
    text?:string;
    fc?:any;
}



const ConfirmDialog:React.FC<Props> = ({label,title,text,fc}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(fc){
        fc();
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='error' onClick={handleClickOpen}>{label}</Button>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
          <div style={{padding:'10px 20px'}}>
 
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                
                {text && 
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
                </DialogContent>
                }
                
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="error" variant='outlined' style={{marginRight:'25px'}}>Cancel</Button>
                    <Button onClick={()=>handleClose()} autoFocus variant="contained">{label}</Button>
                </DialogActions>
            </div>
      </Dialog>
    </div>
  );
}



export default React.memo(ConfirmDialog);