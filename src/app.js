import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import * as reducers from './reducers';

const history = createHistory();
const middleware = routerMiddleware(history);

import App from './components/App';

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

function run() {
  ReactDOM.render((
    <Provider store={store}>
      {
      <ConnectedRouter history={history}>
        <div>
          <Route path='/' component={App} />
        </div>
      </ConnectedRouter>
      }
    </Provider>
  ), document.getElementById('root'));
}

run();

store.subscribe(run);