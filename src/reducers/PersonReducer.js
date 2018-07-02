import { ADD_PERSON } from '../actions/types';

const INITIAL_STATE = {
}

export default (state=INITIAL_STATE, action) => {
    console.log(action);    
    switch(action.type) {
        case ADD_PERSON:
            const newObj = {
                name: action.payload.name,
                direction: null,
                amount: null,
                description: ''
            }

            return {
                ...state, 
                [action.payload.personId]: newObj
            }

        default:
            return state;
    }
}