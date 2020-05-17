import React, { useEffect, Suspense } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import Logout from "./components/containers/Auth/Logout/Logout";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";

import * as actions from "./store/actions/index";

const Auth = React.lazy(() => {
  return import("./components/containers/Auth/Auth")
});

const Checkout = React.lazy(() => {
  return import("./components/containers/Checkout/Checkout")
});

const Orders = React.lazy(() => {
  return import("./components/containers/Orders/Orders")
});


const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/auth" render={(props) => <Auth {...props} />}/>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" render={(props) => <Checkout {...props} />}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/orders" render={(props) => <Orders {...props} />}/>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
          <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
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