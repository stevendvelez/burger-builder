import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Auxilary from "../../../hoc/Auxilary/Auxilary";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Burger from "../../Burger/Burger";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../../store/actions/index";
import axios from "../../../axios-orders";

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [props]); 

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout");
    }

    const disabledInfo = {
        ...props.ings
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (props.ings) {
        burger = (
            <Auxilary>
                <Burger ingredients={props.ings}/>
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated} />
            </Auxilary>);
        orderSummary = <OrderSummary 
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}/>;

    }

    return (
        <Auxilary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}    
            </Modal>
            {burger}
        </Auxilary>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));