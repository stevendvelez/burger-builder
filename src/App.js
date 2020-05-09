import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Auth from "./components/containers/Auth/Auth";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/containers/Checkout/Checkout";
import Logout from "./components/containers/Auth/Logout/Logout";
import Layout from "./components/Layout/Layout";
import Orders from "./components/containers/Orders/Orders";

import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  } 
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));