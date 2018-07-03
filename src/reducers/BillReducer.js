import { ADD_BILL, ADD_PEOPLE, CHECK_STATUS } from '../actions/types';

const INITIAL_STATE = {
    BillsMap: {
        1: [
            {
                amount: 0,
                description: '',
                direction: 'tie',
                name: 'You'
            }
        ]
    },
    checkedItem: false
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

            newBillsMap = {...state.BillsMap, [action.payload.personId]: [newObj]}

            return {
                ...state,
                BillsMap: newBillsMap
            }

        case ADD_BILL:
            newBillsMap = {...state.BillsMap}
            Object.keys(action.payload).map(key => {
                newBillsMap[key] = [...newBillsMap[key], action.payload[key]]
            });
        
            return { 
                ...state,
                BillsMap: newBillsMap
            }
        case CHECK_STATUS:
            return {
                ...state,
                checkedItem: !state.checkedItem
            }
        default:
            return state;
    }
}