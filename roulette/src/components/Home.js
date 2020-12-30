import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

function Home() {

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }))
    
      const classes = useStyles();

    return (
        <div className="Home" >
            <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button className={classes.margin} variant="contained">New Game</Button>
            </Link>
            <Button className={classes.margin} variant="contained">Search Games</Button>
        </div>
    )

}

export default Home;