import { combineReducers } from "redux";
import { reducer as Form } from 'redux-form';

import navbar from './navbarReducer';
import home from './homeReducer';
import yeguada from './yeguadaReducer';

const rootReducer = combineReducers({
    Form,
    navbar,
    home,
    yeguada
});

export default rootReducer;