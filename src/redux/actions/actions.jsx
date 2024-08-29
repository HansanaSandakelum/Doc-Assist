// action - auth reducer
import {decrypt} from "../../utils/utils";

export const LOGOUT = "@auth/LOGOUT";
export const LOGOUT_REQUIRED = "@auth/LOGOUT_REQUIRED";

// action - rememberMe reducer
export const REMEMBER_ME = "@rememberMe/REMEMBER_ME";
export const REMEMBER_ME_REQUIRED = "@rememberMe/REMEMBER_ME_REQUIRED";
export const FORGET_ME = "@rememberMe/FORGET_ME";
export const FORGET_ME_REQUIRED = "@rememberMe/FORGET_ME_REQUIRED";

// action - customization reducer
export const SET_SYSTEM_MODE = '@customization/SET_SYSTEM_MODE';
export const SET_MODE = '@customization/SET_MODE';
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

// action - language reducer
export const SET_LANGUAGE = "@language/SET_LANGUAGE";
export const SET_LANGUAGE_REQUESTED = "@language/SET_LANGUAGE_REQUESTED";

export const Types = {
    LOGIN_REQUESTING: "@auth/LOGIN_REQUESTING",
    LOGIN_REQUEST: "@auth/LOGIN_REQUEST",
    LOGIN_SUCCESS: "@auth/LOGIN_SUCCESS",
    LOGIN_ERROR: "@auth/LOGIN_ERROR",
    LOGOUT: "@auth/LOGOUT",
    REMEMBER_ME: "@remember-me/REMEMBER_ME",
    FORGET_ME: "@remember-me/FORGET_ME"
};

// In order to perform an action of type LOGIN_REQUESTING
// we need an email and password
export function loginRequest(values) {
    return {
        type: Types.LOGIN_REQUESTING,
        payload: values
    }
}

export const getLoginSuccess = items => ({
    type: Types.LOGIN_SUCCESS,
    payload: items
});

export const getLoginError = items => ({
    type: Types.LOGIN_ERROR,
    payload: items
});

export const getLogout = () => ({
    type: Types.LOGOUT
});

export const setRememberMe = items => ({
    type: Types.REMEMBER_ME,
    payload: items
});

export const setForgetMe = () => ({
    type: Types.FORGET_ME
});

export function  getState(state){
    return decrypt(state);
}