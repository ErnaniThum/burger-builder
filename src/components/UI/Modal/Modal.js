import React from 'react'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'
const modal = props => (
  <Aux>
  <Backdrop 
    show={props.show}
    onBackdropClicked={props.onBackdropClicked}
  />
  <div 
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
    }}
    className={classes.Modal}>

    {props.children}
  </div>
  </Aux>
);

export default modal;