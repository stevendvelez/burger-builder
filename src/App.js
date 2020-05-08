import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Auth from "./components/containers/Auth/Auth";
import BurgerBuilder from "./components/containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/containers/Checkout/Checkout";
import Layout from "./components/Layout/Layout";
import Orders from "./components/containers/Orders/Orders";

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
        </Layout>
      </div>
    );
  } 
}

export default App;