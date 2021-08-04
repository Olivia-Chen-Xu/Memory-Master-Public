import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createCard, updateCard } from '../../actions/cards';
import useStyles from './styles';

const CardForm = ({ cardId, setCardId, open, setOpen }) => {
  const [cardData, setCardData] = useState({ word: '', definition: '', context: '', ownSentence: '' });
  const card = useSelector((state) => (cardId ? state.cards.find((message) => message._id === cardId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

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

    if (cardId === 0) {
      dispatch(createCard({ ...cardData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updateCard(cardId, { ...cardData, name: user?.result?.name }));
      clear();
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{cardId ? `Editing "${card.word}"` : 'Creating a Flashcard'}</Typography>
        <TextField name="word" variant="outlined" label="Word" fullWidth value={cardData.word} onChange={(e) => setCardData({ ...cardData, word: e.target.value })} />
        <TextField name="definition" variant="outlined" label="Definition" fullWidth multiline rows={4} value={cardData.definition} onChange={(e) => setCardData({ ...cardData, definition: e.target.value })} />
        <TextField name="context" variant="outlined" label="Context" fullWidth multiline rows={4} value={cardData.context} onChange={(e) => setCardData({ ...cardData, context: e.target.value })} />
        <TextField name="ownSentence" variant="outlined" label="OwnSentence" fullWidth multiline rows={4} value={cardData.ownSentence} onChange={(e) => setCardData({ ...cardData, ownSentence: e.target.value })} />
        <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary" size="large" fullWidth>Cancel</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        </DialogActions>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
      </DialogContent>
    </Dialog>
      
  );
};

export default CardForm;