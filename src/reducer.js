import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'

const initialState = {
    isLoggedIn: false,
    user: {},
    token: ""
}

const firstReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGIN":
            return {
                isLoggedIn: action.payload,
                user: {name: "Vineet", email: "vineet@gmail.com"},
                token: "vineet@gmail.comsdgsdgfsdfsdfsdfsfdsfsd"
            }

        case "LOGOUT":
            return {
              isLoggedIn: false,
              user: {},
              token: ""
            }

        case "STOREDATA":
            return {

            }

        default:
            return state;
    }

}

const secReducer = (state = {}, action) => {
    return state;
}

const form = formReducer

const reducers = combineReducers({
    firstReducer, secReducer, form
});

export default reducers;
