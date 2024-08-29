import api from "./interceptor";
import axios from "axios";

export const signIn = (formData: any) => {
    let postData = {
        email: formData.username,
        password: formData.password,
    };

    return api.post("/api/v1/sso/login-or-register-with-azure", postData);
};

export const signUp = (formData: { fname: string, lname: string, email: string, mobile: string, username: string, password: string }) => {
    let postData = {
        firstName: formData.fname,
        lastName: formData.lname,
        userName: formData.username,
        password: formData.password,
        contactNumber: formData.mobile,
        email: formData.email
    };

    return api.post("/api/v1/registration/owner-registration", postData);
};

// -------------------# dashboard services endpoints start here #-------------------------

export const getDashboardData = (formData : object) => {
    let postData = formData

    return api.post("/dashboard-management/get-dashboard-details",postData);
};

export const downloadFile = (url: string) => {
    return axios.get(url, {
        responseType: 'blob',
    });
};