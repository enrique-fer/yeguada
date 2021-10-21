import { combineReducers } from "redux";
import { reducer as Form } from 'redux-form';

import navbar from './navbarReducer';
import home from './homeReducer';

const rootReducer = combineReducers({
    Form,
    navbar,
    home
});

export default rootReducer;