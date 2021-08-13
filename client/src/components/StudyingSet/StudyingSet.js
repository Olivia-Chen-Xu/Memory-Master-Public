import { Button, Card, CardContent, Typography, Container, CircularProgress, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateCard } from '../../actions/cards';
import { getSets } from '../../actions/sets';
import './styles.css';

const StudyingSet = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch(getSets());
        }, [dispatch]);

    const { setId } = useParams();
    const set = useSelector(state => state.sets.find(set => set._id === setId));

    const [cardIndex, setCardIndex] = useState(0);
    const [flip, setFlip] = useState(false);

    const handleNextCard = (card, set, finish) => async(e) => {
        e.preventDefault();
        console.log("updating card");
        dispatch(updateCard({...card, timesStudied: card.timesStudied + 1 }, set ));
        finish ? history.push('/sets') : setCardIndex(cardIndex + 1);
    }

    return ( !set ? <CircularProgress /> : 
        <div>
            <div className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
            {/* <CardContent><Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].word}</Typography></CardContent> */}
                <div className="front"><Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].word}</Typography></div>
                <div className="back">
                    <Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].word}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].definition}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].context}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{set.cards[cardIndex].ownSentence}</Typography>                  
                </div> 
            </div>
            {cardIndex < set.cards.length - 1 ? <Button onClick={handleNextCard(set.cards[cardIndex], set)} >next card</Button> : null}
            <Button onClick={handleNextCard(set.cards[cardIndex], set, "finish")}  >Finish</Button>
        </div>
    );
};

export default StudyingSet;

//testing commit