import React, { Component } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		 ingredients: null,
		 totalPrice: 4,
		 purchasable: false,
		 purchasing: false,
		 loading: false,
		 error: null
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0)
		
		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCounted = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		
		updatedIngredients[type] = updatedCounted;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return
		}
		const updatedCounted = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		
		updatedIngredients[type] = updatedCounted;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	} 

	componentDidMount = () => {
		console.log(this.props);
		axios.get('https://react-my-burger-a791f.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				this.setState({ error: true })
			})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Error: Ingredients can't be loaded</p> : <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={ this.state.ingredients } />
					<BuildControls 
						ingredientAdded={ this.addIngredientHandler }
						ingredientRemoved={ this.removeIngredientHandler } 
						disabled={ disabledInfo }
						purchasable={ this.state.purchasable }
						price={ this.state.totalPrice }
						ordered= { this.purchaseHandler }
					/>
				</React.Fragment>
			)
			
			orderSummary = <OrderSummary 
				ingredients={ this.state.ingredients } 
				purchaseCancelled={ this.purchaseCancelHandler }
				purchaseContinue={ this.purchaseContinueHandler }
				price={ this.state.totalPrice }
			/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<React.Fragment>
				<Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
					{ orderSummary }
				</Modal>
				{ burger }
			</React.Fragment>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios);