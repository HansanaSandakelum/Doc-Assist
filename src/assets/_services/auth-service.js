import * as api from "../api/index";
import {
    FORGET_ME_REQUIRED,
    LOGIN_REQUIRED,
    REMEMBER_ME_REQUIRED
} from "../../redux/actions/actions";
export const AuthService = {
    signIn: (values, dispatch) => dispatch(signIn(values)),
}

const signIn = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        if (formData.rememberMe) {
            let rememberUserData = {
                usuario: formData.username,
                clave: formData.password,
                recuerdame: formData.rememberMe,
            };
            dispatch({ type: REMEMBER_ME_REQUIRED, rememberUserData });
        } else {
            dispatch({ type: FORGET_ME_REQUIRED });
        }

        dispatch({ type: LOGIN_REQUIRED, data });

        return {isSuccess: true, data: data.data};
    } catch (error) {

        return {isSuccess: false, data: error};
    }
}