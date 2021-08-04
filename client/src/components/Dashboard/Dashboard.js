import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getSets } from '../../actions/sets';
import Sets from '../Sets/Sets';

const Dashboard = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSets());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Sets/>
          </Grid>
          
        </Grid>
      </Container>
    </Grow>
  );
};

export default Dashboard;