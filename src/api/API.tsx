import axios from "../../axiosConfig";

 export const fetchAgents = async () => {
  const res = await axios.get('/Agent/GetAllAgents');
  return res.data;
};

export const registerUser = async (formData: {
  name: string;
  email: string;
  password: string;
  agentId: number;
}) => {
  const res = await axios.post("/Sender/Register-Sender", formData);
  return res.data;
};


