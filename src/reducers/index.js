import { combineReducers } from 'redux';

import PersonReducer from './PersonReducer';
import BillReducer from './BillReducer';

export default combineReducers({
    people: PersonReducer,
    bills: BillReducer
})