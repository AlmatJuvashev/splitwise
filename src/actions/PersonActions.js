import {ADD_PERSON, ADD_PEOPLE, CHECK_STATUS} from './types';
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

export const addPerson = (value) => {
    return {
        type: ADD_PEOPLE,
        payload: value
    }
}

export const checkStatus = () => {
    return {
        type: CHECK_STATUS,
    }
}