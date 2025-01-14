import axios from 'axios';

export const sendOtp = async (email) => {
  try {
    const data = {
      email: `${email}`,
    };

    const res = await axios.post('http://35.174.44.86:8000/auth/signin', data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const mobileOtp = async (phone) => {
  try {
    const data = {
      phone: `+${phone}`,
    };

    const res = await axios.post('http://35.174.44.86:8000/auth/signin', data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (username, otp) => {
  try {
    const data = {
      username: `${username}`,
      otp: `${otp}`,
    };
    console.log(data);

    return axios.post('http://35.174.44.86:8000/auth/submit-otp', data);
  } catch (error) {
    throw error;
  }
};
