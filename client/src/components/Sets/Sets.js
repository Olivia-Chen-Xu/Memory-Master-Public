import React, { useEffect } from 'react';
import { Card, Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSet } from '../../actions/sets.js';
import Set from './Set/Set';
import useStyles from './styles';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { getSets } from '../../actions/sets';

const Sets = ({ setCurrentSetId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getSets());
      }, [dispatch]);

    const sets = useSelector((state) => state.sets);
    console.log(sets);
        
    return (
        !sets.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {sets.map((set) => (
            <Grid key={set._id} item xs={12} sm={6} md={6}>
                <Card>
                    <Typography variant="h6">{set.name}</Typography>
                    <Link to={`set/${set._id}`}>View and Edit</Link>
                    <Button size="small" color="secondary" onClick={() => dispatch(deleteSet(set._id))}>Delete</Button>
                    <Link to={`studying/set/${set._id}`}> Study this set</Link>
                </Card>
                {/* <Switch>
                        <Route exact path={`set/${set._id}`} render={() => <Set />}/>
                </Switch>  */}
            </Grid>
            ))}
        </Grid>
        )
    );
    };

export default Sets;

//comment
//comment2