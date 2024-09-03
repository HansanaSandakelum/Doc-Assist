import api from "./interceptor";
import axios from "axios";

export const signIn = (formData: any) => {
  const postData = {
    email: formData.username,
    password: formData.password,
  };

  return api.post("/api/v1/sso/login-or-register-with-azure", postData);
};

export const signUp = (formData: {
  name: string;
  
  mobile: string;
  register: string;
  password: string;
  station: string;
  hotline: number;
  sessions: number;
  inventory: number;
  
}) => {
  const postData = {
    firstName: formData.name,
    register: formData.register,
    station: formData.station,
    password: formData.password,
    contactNumber: formData.mobile,
    
    hotline: formData.hotline,
    sessions: formData.sessions,
    inventory: formData.inventory,
    
  };

  return api.post("/api/v1/registration/owner-registration", postData);
};

// -------------------# dashboard services endpoints start here #-------------------------

export const getDashboardData = (formData: object) => {
  const postData = formData;

  return api.post("/dashboard-management/get-dashboard-details", postData);
};

export const downloadFile = (url: string) => {
  return axios.get(url, {
    responseType: "blob",
  });
};
