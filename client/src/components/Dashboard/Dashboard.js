import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getSets } from '../../actions/sets';
import SetForm from '../SetForm/SetForm';
import Sets from '../Sets/Sets';

const Dashboard = () => {
  
  const dispatch = useDispatch();
  const [openSetForm, setOpenSetForm] = useState(false);

  useEffect(() => {
    dispatch(getSets());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Button variant="outlined" color="primary" onClick={() => setOpenSetForm(true)}>
        Create a set
        </Button>
      <SetForm open={openSetForm} setOpen={setOpenSetForm} currentSetId={0}/>
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