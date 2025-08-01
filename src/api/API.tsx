import axios from "../../axiosConfig";


export const fetchProducts = async () => {
  const res = await axios.get('/products');
  return res.data;
};

export const addProduct = async (product: { title: string; description: string; price: number;  image: string; }) => {
  const res = await axios.post('/products', product);
  return res.data;
};


  