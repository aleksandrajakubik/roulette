import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { sendChangeAnswer } from '../../store/actions/gameAction';

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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CustomizedDialogs({ nick, userId, betCash, betType, sendChangeAnswer, id, client}) {

    useEffect(() => {
        client.subscribe(`answer/${id}`);
        client.on('message', (topic, payload, packet) => {
            if (topic === `answer/${id}`) {
                if(JSON.parse(payload).answer.toString() === "YES") {
                    setText(`Users agreed for changing ${nick}'s bet!`);
                    setAnswered(true)
                } else {
                    setText(`Your bet won't be changed :(`);
                    setAnswered(true)
                }
            }
        });
    }, [client])


  const [open, setOpen] = React.useState(true);
  const [text, setText] = React.useState(`${nick} wants to change a bet, do you agree?`);
  const [answered, setAnswered] = React.useState(false)

  function handleClose() {
      setOpen(false)
      client.publish('clear', '')
  }

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Changing bet!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {text}
          </Typography>
        </DialogContent>
        <DialogActions>
            {answered ? <Button autoFocus onClick={handleClose} color="primary">Close</Button>:
            <>
          <Button autoFocus onClick={() => sendChangeAnswer(id, userId, "YES", nick, betCash, betType)} color="primary">
            Yes
          </Button>
          <Button autoFocus onClick={() => sendChangeAnswer(id, userId, "NO", nick, betCash, betType)} color="primary">
            No
          </Button>
          </>
        }
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default connect(null, { sendChangeAnswer })(CustomizedDialogs);