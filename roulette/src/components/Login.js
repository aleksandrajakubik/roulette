import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

function Login() {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(5),
                width: theme.spacing(35),
                height: theme.spacing(35),
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Paper elevation={3}>
                <h3>Login</h3>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Nick" variant="outlined" />
                    <TextField id="outlined-basic" label="Cash" variant="outlined" />
                    <Button variant="contained">Start!</Button>
                </form>
            </Paper>
        </div>
    );

}

export default Login;