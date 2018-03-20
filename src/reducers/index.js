import { combineReducers } from 'redux';
import sassFrameworkBuilder from './sassFrameworkBuilderReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  sassFrameworkBuilder: sassFrameworkBuilder,
  routing: routerReducer
});

export default rootReducer;
