import firebase from "firebase";
import { CREATE_ORDER } from "../actionTypes";


export const createOrder = (orderData) => dispatch => {
    return {
        type: CREATE_ORDER,
        data: orderData
    }
}