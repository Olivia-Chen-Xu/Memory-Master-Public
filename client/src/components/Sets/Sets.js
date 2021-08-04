import React from 'react';
import { Card, Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { deleteSet } from '../../actions/sets.js';
import Set from './Set/Set';
import useStyles from './styles';
import { Switch, Route, useRouteMatch, Link, BrowserRouter } from 'react-router-dom';

const Sets = ({ setCurrentSetId }) => {
    const sets = useSelector((state) => state.sets);
    //const { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const classes = useStyles();

    console.log(sets);
        
    return (
        !sets.length ? <CircularProgress /> : (
        <BrowserRouter>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {sets.map((set) => (
            <Grid key={set._id} item xs={12} sm={6} md={6}>
                <Card>
                    <Typography variant="h6">{set.name}</Typography>
                    <Link to={`set/${set._id}`}>View and Edit</Link>
                    <Button size="small" color="secondary" onClick={() => dispatch(deleteSet(set._id))}>Delete</Button>
                </Card>
                <Switch>
                        <Route exact path={`set/${set._id}`}>
                            <Set set={set} setCurrentSetId={setCurrentSetId} />
                        </Route>
                </Switch> 
            </Grid>
            ))}
        </Grid>
        </BrowserRouter>
        )
    );
    };

export default Sets;

//comment