import React, {useState} from 'react';
import { Card, CardActions, CardContent, Button, Typography, CircularProgress } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { deleteCard } from '../../actions/cards';
import CardForm from '../CardForm/CardForm';
import useStyles from './styles';
import { updateSet } from '../../actions/sets';

const Flashcard = ({ set, card }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [openCardForm, setOpenCardForm] = useState(false);


  return (!set ? <CircularProgress /> : 
    <Card className={classes.flashcard}>
      <CardForm set={set} cardId={card._id} open={openCardForm} setOpen={setOpenCardForm} />
      <Typography variant="body2" color="textSecondary">{moment(card.createdAt).fromNow()}</Typography>
      {(user?.result?.googleId === card?.creator || user?.result?._id === card?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => {setOpenCardForm(true)}} style={{ color: 'grey' }} size="small">
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      )}
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{card.word}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{card.definition}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{card.context}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{card.ownSentence}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteCard(card._id, set))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Flashcard;