import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
    <Typography variant="h6">{children}</Typography>
    {onClose ? (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      </Link>
    ) : null}
  </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function LostDialog({ handleClose }) {

  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Dialog  aria-labelledby="customized-dialog-title" open={open} onClose={handleClose}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          :(
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Sorry, you lost!
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
