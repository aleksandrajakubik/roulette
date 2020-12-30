import React from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Home from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

function Nav() {
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            width: '100%'
        },
    });

    const classes = useStyles();

    return (
        <Paper square className={classes.root}>
            <Link to='/'>
            <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon tabs example"
            >
                
                <Tab icon={<Home />} aria-label="home" />
            </Tabs>
            </Link>
        </Paper>
    );
}

export default Nav;