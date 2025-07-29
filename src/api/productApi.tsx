import axios from "../../axiosConfig";

 export const fetchCourses = async () => {
  const res = await axios.get('/Course');
  return res.data;
};

export const registerUser = async (userData: { name: string; role: string ; userName: string; password: string}) => {
  const res = await axios.post("User/Register",userData);
  return res.data;
};


export const verifyEmailPost = async (email: string, token: string) => {
  const res = await axios.post(
    "User/Verify",
    {}, 
    {
      params: { email, token },
    }
  );
  return res.data;
};


