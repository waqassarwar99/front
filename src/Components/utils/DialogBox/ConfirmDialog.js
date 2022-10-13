import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ConfirmDialog(props) {
    const {confirmDialog} = props;
  return (
    <Dialog open = {confirmDialog.isOpen} >
        <DialogTitle>

        </DialogTitle>
        <DialogContent>
            <Typography variant='h6'>
                {confirmDialog.title}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant='text'>No</Button>
            <Button variant='text'>Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog