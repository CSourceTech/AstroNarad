import axios from "axios";

export const sendOtp = async (email, phone) => {
  try {
    const data = {
      email: `${email}`,
      phone: `+${phone}`,
    };
    
    const res = await axios.post('https://astrotalk-pink.vercel.app/auth/signin', data); 
    return res;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (username, otp) => {
  try {
    const data = {
      username : `${username}`,
      otp: `${otp}`,
    };
    console.log(data)
     
    return axios.post('https://astrotalk-pink.vercel.app/auth/submit-otp', data)
  }
  catch (error){
    throw error;
  }
}
