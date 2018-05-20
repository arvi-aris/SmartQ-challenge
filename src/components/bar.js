import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png'
import Grid from '@material-ui/core/Grid';

class Bar extends Component {
  render() {
    console.log(logo)
    return(
      <div className="bar">
      <AppBar position="static" color="primary">
        <Toolbar>
        <img className="logo" src={logo} />
          <Typography variant="title" color="inherit">
            <div className="bar-header">
              Home
            </div>
          </Typography>
              <Grid item xs alignItems="flex-end" justify="flex-start">
                <div className="logged-in-user">
                  aravindh.nagarajan@hotmail.com
                </div>
              </Grid>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default Bar;
