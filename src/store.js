import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducer';

const composedMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(thunk);

export default createStore(reducer, composedMiddleware);
