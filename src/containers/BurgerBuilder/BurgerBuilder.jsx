import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  purchaseHandler() {
    this.setState({purchasing: true})
  }
  
  purchaseCancelHandler() {
    this.setState({purchasing: false})
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => sum + el, 0);
      this.setState({purchasable: sum > 0})
  }

  purchaseContinueHandler = () => {
    alert('Continue')
  }
  purchaseCanceledHandler = () => {
    alert('Canceled')
  }

  addIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1; 
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldTotalPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const updatedPrice = oldTotalPrice + priceAddition;
    
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler (type) {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1; 
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const oldTotalPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const updatedPrice = oldTotalPrice - priceDeduction;
    
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
    this.updatePurchaseState(updatedIngredients);
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for(const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          onBackdropClicked={this.purchaseCancelHandler.bind(this)}
        >
          <OrderSummary 
          totalPrice={this.state.totalPrice} 
          ingredients={this.state.ingredients}
          purchaseContinueHandler={this.purchaseContinueHandler.bind(this)}
          purchaseCanceledHandler={this.purchaseCanceledHandler.bind(this)}

        />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded={this.addIngredientHandler.bind(this)}
        ingredientRemoved={this.removeIngredientHandler.bind(this)}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler.bind(this)}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;