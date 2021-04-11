import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngrediant/BurgerIngrediant';
const burger = props => {
   let tranformedIngredients = Object.keys(props.ingredients).map(igKey => {
      return [...Array(props.ingredients[igKey])].map((el, idx) => {
         return <BurgerIngredient key={`${igKey}_${idx}`} type={igKey}/>
      });
   }).reduce((arr, el) => {
      return arr.concat(el);
   }, []);
   
   if (tranformedIngredients.length === 0) {
      tranformedIngredients = <p>Please start adding ingredients!</p>
   }

   return (
      <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {tranformedIngredients}
        <BurgerIngredient type='bread-bottom' />
      </div>
   );
};

export default burger;