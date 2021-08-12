import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { createCard, updateCard } from '../../actions/cards';
import useStyles from './styles';

const CardForm = ({ set, cardId, open, setOpen }) => {
  const [cardData, setCardData] = useState({ word: '', definition: '', context: '', ownSentence: '' });
  console.log(cardId);
  const card = cardId ? set.cards.find((message) => message._id === cardId) : null;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (card) setCardData(card);
  }, [card]);

  const clear = () => {
    setCardData({ ...cardData, word: '', definition: '', context: '', ownSentence: '' });
  };

  const handleClose = () => {
    setOpen(false);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cardId === 0 ) {
      dispatch(createCard({ ...cardData }, set));
      clear();
      
    } else {
      dispatch(updateCard({ ...cardData }, set));
      console.log("card updated");
      clear();
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{cardId ? `Editing "${card?.word}"` : 'Creating a Flashcard'}</Typography> 
        <TextField name="word" variant="outlined" label="Word" required fullWidth value={cardData.word} onChange={(e) => setCardData({ ...cardData, word: e.target.value })} />
        <TextField name="definition" variant="outlined" label="Definition" required fullWidth value={cardData.definition} multiline rows={4} onChange={(e) => setCardData({ ...cardData, definition: e.target.value })} />
        <TextField name="context" variant="outlined" label="Context" required fullWidth value={cardData.context} multiline rows={4} onChange={(e) => setCardData({ ...cardData, context: e.target.value })} />
        <TextField name="ownSentence" variant="outlined" label="OwnSentence" required fullWidth value={cardData.ownSentence} multiline rows={4} onChange={(e) => setCardData({ ...cardData, ownSentence: e.target.value })} />
        <Button onClick={handleClose} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary" size="large" fullWidth>Cancel</Button>       
        </DialogActions>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
      </DialogContent>
    </Dialog>
      
  );
};

export default CardForm;