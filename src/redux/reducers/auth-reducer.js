import * as actions from "../actions/actions";
import {decrypt, encrypt} from "../../utils/utils";

const initialState = {
    requesting: false,
    successful: false,
    authData: null,
    errors: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.Types.LOGIN_REQUESTING:
            return {...state, requesting: true, successful: false, authData: null, errors: null};
        case actions.Types.LOGIN_SUCCESS:
            let encryptedData = encrypt({...action.payload.data});
            return {...state, requesting: false, successful: true, authData: encryptedData, errors: null};
        case actions.Types.LOGIN_ERROR:
            return {...state, requesting: false, successful: false, authData: null, errors: action.payload.error};
        case actions.Types.LOGOUT:
            return {...state, requesting: false, successful: false, authData: null, errors: null};
        default:
            return state;

    }
}

export default authReducer;