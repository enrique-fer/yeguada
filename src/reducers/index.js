import { combineReducers } from "redux";
import { reducer as Form } from 'redux-form';

import navbar from './navbarReducer';
import home from './homeReducer';
import yeguada from './yeguadaReducer';
import shop from './shopReducer';

const rootReducer = combineReducers({
    Form,
    navbar,
    home,
    yeguada,
    shop
});

export default rootReducer;