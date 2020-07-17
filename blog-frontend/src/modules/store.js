import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk';
import rootReducer from 'modules/index';



const middleware = applyMiddleware(ReduxThunk);


const store = createStore(rootReducer, composeWithDevTools(middleware));



export default store;
