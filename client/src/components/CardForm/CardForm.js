import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Dialog, DialogContent, DialogActions, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createCard, updateCard } from '../../actions/cards';
import useStyles from './styles';
import { updateSet } from '../../actions/sets';

const CardForm = ({ set, cardId, setCardId, open, setOpen }) => {
  const [cardData, setCardData] = useState({ word: '', definition: '', context: '', ownSentence: '' });
  const card = cardId ? set?.find((message) => message._id === cardId) : null;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (card) setCardData(card);
  }, [card]);

  const clear = () => {
    //setCardId(0);
    setCardData({ word: '', definition: '', context: '', ownSentence: '' });
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
      dispatch(updateCard(cardId, { ...cardData }));
      clear();
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Creating a card</Typography> 
        {/* {cardId ? `Editing "${card.word}"` : 'Creating a Flashcard'} */}
        <TextField name="word" variant="outlined" label="Word" required fullWidth onChange={(e) => setCardData({ ...cardData, word: e.target.value })} />
        <TextField name="definition" variant="outlined" label="Definition" required fullWidth multiline rows={4} value={cardData.definition} onChange={(e) => setCardData({ ...cardData, definition: e.target.value })} />
        <TextField name="context" variant="outlined" label="Context" required fullWidth multiline rows={4} value={cardData.context} onChange={(e) => setCardData({ ...cardData, context: e.target.value })} />
        <TextField name="ownSentence" variant="outlined" label="OwnSentence" required fullWidth multiline rows={4} value={cardData.ownSentence} onChange={(e) => setCardData({ ...cardData, ownSentence: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
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