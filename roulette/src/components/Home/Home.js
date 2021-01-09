import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connectToMQTT } from '../../store/actions/gameAction'

function Home() {

  useEffect(() => {
    connectToMQTT()
  }, [])

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
            <Link to="/games" style={{ textDecoration: 'none' }}>
            <Button className={classes.margin} variant="contained">Search Games</Button>
            </Link>
        </div>
    )

}

export default connect(null, { connectToMQTT })(Home);