import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createSet, updateSet } from '../../actions/sets';
import useStyles from './styles';
import { updateCard } from '../../actions/cards';

const SetForm = ({ open, setOpen, currentSetId}) => {
  const [setData, setSetData] = useState({ name: '' });
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const set = useSelector((state) => (currentSetId ? state.sets.find(set => set._id === currentSetId): null));

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if (set) setSetData(set);
  }, [set]);

  const clear = () => {
    setSetData({ name: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentSetId === 0) {
      dispatch(createSet({ ...setData }));
      clear();
    } else {
      dispatch(updateSet(currentSetId, { ...setData }));
      clear();
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentSetId ? `Editing "${set.name}"` : 'Creating a Set'}</Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth value={setData.name} onChange={(e) => setSetData({ ...setData, name: e.target.value })} />
          <DialogActions>
          <Button onClick={handleClose} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button onClick={handleClose} variant="contained" color="primary" size="large" fullWidth>Cancel</Button>
          </DialogActions>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetForm;