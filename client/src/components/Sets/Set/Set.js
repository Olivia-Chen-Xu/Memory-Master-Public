import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Container, Button, Typography, Card, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from '../../../actions/cards';
import SetForm from '../../SetForm/SetForm';
import Testing from './Testing';
import CardForm from '../../CardForm/CardForm';
import Flashcard from '../../Card/Card';

import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getSets } from '../../../actions/sets';

const Set = () => { 
  
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getSets());
    }, [dispatch]);

  const { setId } = useParams();
  const set = useSelector(state => state.sets.find(set => set._id === setId));
  const classes = useStyles();
  
  const [openSetForm, setOpenSetForm] = useState(false);
  const [openCardForm, setOpenCardForm] = useState(false);

  // useEffect(() => {
  //   dispatch(getCards());
  // }, [currentCardId, dispatch]);

  return (!set ? <CircularProgress /> :
    <Container component="main">
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{set.name}</Typography>
      <Button variant="outlined" color="primary" onClick={() => setOpenSetForm(true)}>
        Edit Set
      </Button>
      <Button variant="outlined" color="primary" onClick={() => setOpenCardForm(true)}>
        Add a card
      </Button>
      {/* <Testing set={set} cardId={currentCardId} setCardId={setCurrentCardId} open={openCardForm} setOpen={setOpenCardForm} />  */}
      <CardForm set={set} cardId={0} open={openCardForm} setOpen={setOpenCardForm} />
      <SetForm open={openSetForm} setOpen={setOpenSetForm} currentSetId={set._id} />
    <Paper>
    {!set.cards.length ? 
    <Typography>Begin by adding a card</Typography> : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
    {set.cards.map((card) => (
        <Grid key={card._id} item xs={12} sm={6} md={6}>
            <Flashcard set={set} card={card} />
        </Grid>
      ))}
    </Grid>
    )}
    </Paper>
  </Container>
);
};

export default Set;