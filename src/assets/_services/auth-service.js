import * as api from "../api/index";
export const AuthService = {
  validateMobile,
  verifyMobile,
  sendLoginOtp,
  verifyLogin,
  resendLoginOtp,
  resendRegisterOtp,
};

async function sendLoginOtp(formData) {
  try {
    const { data } = await api.signIn(formData);
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}

async function verifyLogin(formData) {
  try {
    const { data } = await api.verifyLogin(formData);
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}

async function validateMobile(formData) {
  try {
    const { data } = await api.sentOTP(formData);
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}

async function verifyMobile(formData) {
  try {
    const { data } = await api.verifyTheNumber(formData);
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}

async function resendLoginOtp() {
  try {
    const { data } = await api.resendLoginOtp();
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}

async function resendRegisterOtp() {
  try {
    const { data } = await api.resendRegisterOtp();
    return { isSuccess: true, data: data };
  } catch (error) {
    return { isSuccess: false, data: error };
  }
}
