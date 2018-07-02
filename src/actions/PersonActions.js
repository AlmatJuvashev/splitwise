import {ADD_PERSON} from './types';
import { ADD_BILL } from './types';


export const personUpdate = (value) => {
    return {
        type: ADD_PERSON,
        payload: value
    }
}

export const addBill = (value) => {
    return {
        type: ADD_BILL,
        payload: value
    }
}