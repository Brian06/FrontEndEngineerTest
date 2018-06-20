import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index.reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './persistState';

const persistState = loadState();
const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = createStoreWithMiddleware(reducers,persistState);

store.subscribe( () => {
  saveState(store.getState());
})


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>  , document.getElementById('root'));
registerServiceWorker();
