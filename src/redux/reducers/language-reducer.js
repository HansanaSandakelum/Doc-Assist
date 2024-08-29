import {SET_LANGUAGE} from "../actions/actions";

// Define your state here
const initialState = {
    languageData: 'english'
}
const languageReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, languageData: action?.payload};

        default:
            return state;
    }
};

export default languageReducer;
