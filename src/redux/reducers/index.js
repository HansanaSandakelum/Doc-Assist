import {combineReducers} from "redux";

import customizationReducer from "./customization-reducer";
import authReducer from "./auth-reducer";
import languageReducer from "./language-reducer";
import rememberMeReducer from "./rememberMe-reducer";

export default combineReducers({
    auth: authReducer,
    rememberMe: rememberMeReducer,
    language: languageReducer,
    customization: customizationReducer
});
