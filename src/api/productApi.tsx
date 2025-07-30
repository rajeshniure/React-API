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




export const loginUser = async (userData: { userName: string; password: string }) => {
  const res = await axios.post("User/Login", userData);

  // Inspect the token structure
  console.log("Login response:", res.data);

  // Adjust this depending on what the token structure is
  const token =
    typeof res.data?.token === "string"
      ? res.data.token
      : res.data?.token?.accessToken || res.data?.token?.token || null;

  const userId = res.data?.user?._id || res.data?.id;

  if (token) {
    localStorage.setItem("authToken", token); // store raw string
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("❌ Token not found or invalid in login response.");
  }

  if (userId) {
    localStorage.setItem("userId", userId);
  } else {
    console.warn("❌ User ID not found in response data.");
  }

  return userId;
};


export const getStudentDetails = async () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("No auth token found in localStorage");
  }

  const res = await axios.get(`/Student/6`);
  return res.data;
};