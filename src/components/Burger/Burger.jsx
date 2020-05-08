import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import classes from "./Burger.module.css";

const Burger = (props) => {
    let newIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (newIngredients.length === 0) {
        newIngredients = <p>Please start adding ingredeints!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {newIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;