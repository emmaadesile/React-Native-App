import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';

const initialState = {
  action: 'closeMenu'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU':
      return {
        ...state,
        action: 'closeMenu'
      };
    case 'OPEN_MENU':
      return {
        ...state,
        action: 'openMenu'
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
