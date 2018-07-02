import { ADD_BILL } from '../actions/types';

const INITIAL_STATE = {
    billMap: {
        1: [
            {
                amount: 0,
                description: '',
                direction: 'tie',
                name: 'You'
            }
        ]
    }
}

export default (state=INITIAL_STATE, action) => {
    console.log(action)
    switch(action.type) {
        case ADD_BILL: 
            let billObj = action.payload;
            let newBillMap = {...state.billMap};
            Object.keys(billObj).map(key => {
                if(!newBillMap[key]) {
                    newBillMap[key] = [billObj[key]]
                } else {
                    newBillMap[key] = [...newBillMap[key], billObj[key]]
                }
            })
            console.log("NEW BILLMAP:::", newBillMap);
            return { 
                ...state,
                billMap: newBillMap
            }
        default:
            return state;
    }
}