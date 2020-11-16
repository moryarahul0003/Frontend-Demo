
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import Home from "../src/containers/Home/HomeMain";
import './App.css';

function App() {
  const store = configureStore();
  return (
   
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </ConnectedRouter>
      </Provider>
  );
}

export default App;
