import { ADD_BILL, ADD_PEOPLE } from '../actions/types';

const INITIAL_STATE = {
        1: [
            {
                amount: 0,
                description: '',
                direction: 'tie',
                name: 'You'
            }
        ]
    }

export default (state=INITIAL_STATE, action) => {
    console.log(action)
    switch(action.type) {
        case ADD_PEOPLE:
            let newObj = {
                name: action.payload.name, 
                description: '',
                direction: 'tie',
                amount: 0
            }

            return {
                ...state,
                [action.payload.personId]: [newObj]
            }
        case ADD_BILL:
            Object.keys(action.payload).map(key => {
                state[key] = [...state[key], action.payload[key]]
            });
            
            // Object.keys(billObj).map(key => {
            //     if(!newBillMap[key]) {
            //         newBillMap[key] = [billObj[key]]
            //     } else {
            //         newBillMap[key] = [...newBillMap[key], billObj[key]]
            //     }
            // })

        
            return { 
                ...state
            }
        default:
            return state;
    }
}