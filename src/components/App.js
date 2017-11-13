import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css'

import {Provider} from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './../reducers/rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Content from './../containers/Content';

const history = createHistory();
const routerHistory = routerMiddleware(history);
const middleware = composeWithDevTools( applyMiddleware( routerHistory, thunk, logger ) );
const store = createStore (rootReducer, middleware);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Content}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;