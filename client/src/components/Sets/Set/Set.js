import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Container, Button, Typography, Card, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getCards } from '../../../actions/cards';
import SetForm from '../../SetForm/SetForm';
import CardForm from '../../CardForm/CardForm';
import Flashcard from '../../Card/Card';

import useStyles from './styles';
import { useParams } from 'react-router-dom';

const Set = () => {
  const { setId } = useParams();
  
  const set = useSelector((state) => (state.sets.find(set => set._id === setId)));
  console.log(set);
  
  const cards = set.cards;
  const classes = useStyles();
  const [currentCardId, setCurrentCardId] = useState(0);
  const [openSetForm, setOpenSetForm] = useState(false);
  const [openCardForm, setOpenCardForm] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, [currentCardId, dispatch]);



  return (
    <Container component="main">
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{set.name}</Typography>
      <Button variant="outlined" color="primary" onClick={() => setOpenSetForm(true)}>
        Edit Set
      </Button>
      <Button variant="outlined" color="primary" onClick={() => setOpenCardForm(true)}>
        Add a card
      </Button>
      <CardForm set={set} cardId={0} setCardId={setCurrentCardId} open={openCardForm} setOpen={setOpenCardForm} />
      <SetForm open={openSetForm} setOpen={setOpenSetForm} currentSetId={setId} />
    <Paper>
    {!cards.length ? <CircularProgress /> : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
     {cards.map((card) => (
        <Grid key={card._id} item xs={12} sm={6} md={6}>
            <Flashcard set={set} card={card} setCurrentId={setCurrentCardId} />
        </Grid>
      ))}
    </Grid>
    )}
    </Paper>
  </Container>
  );
};

export default Set;