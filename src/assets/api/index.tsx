import api from "./interceptor";
import axios from "axios";

export const signIn = (formData: any) => {
  const postData = {
    mobile: formData.mobileNumber,
    password: formData.password,
  };

  return api.post("/user-login/user-login", postData);
};

export const signUp = (formData: {
  name: string;

  mobile: string;
  register: string;
  password: string;
  station: string;
  hotline: boolean;
  sessions: boolean;
  inventory: boolean;
}) => {
  const hotlineNumber = formData.hotline ? "1" : "0";
  const sessionsNumber = formData.sessions ? "1" : "0";
  const inventoryNumber = formData.inventory ? "1" : "0";

  const featuresNeeded = sessionsNumber + inventoryNumber + hotlineNumber;

  const postData = {
    // firstName: formData.name,
    mobile: formData.mobile,
    password: formData.password,
    registrationNumber: formData.register,
    currentWorkingStation: formData.station,
    featuresNeeded: featuresNeeded,
    // contactNumber: formData.mobile,
    // hotline: hotlineNumber,
    // sessions: sessionsNumber,
    // inventory: inventoryNumber,
  };
  console.log(postData);

  return api.post("/user-registration/doctor-registration", postData);
};

// -------------------# sentOtp #-------------------------

export const sentOTP = (formData: any) => {
  const postData = {
    userId: formData.userId,
    mobile: formData.mobile,
  };

  return api.post("/registration/send-the-OTP", postData);
};

// -------------------# verifyOtp #-------------------------
export const verifyTheNumber = (formData: any) => {
  const postdata = {
    verifyMobileOTPNumber: Number(formData),
  };
  console.log(postdata);

  return api.post("/user-registration/verify-mobile-number-doctor", postdata);
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
