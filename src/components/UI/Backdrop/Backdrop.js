import React from 'react';
import classes from './Backdrop.css'

const backdrop = props => (
  props.show === true ? <div onClick={props.onBackdropClicked} className={classes.Backdrop}></div> : null
);

export default backdrop;