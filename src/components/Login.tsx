import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useForm} from "react-hook-form";
import { loginUser } from "../api/productApi";
import {useNavigate} from "react-router-dom";

type FormValues = {

  userName: string;
  password: string;
};

const LoginForm = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

 const onSubmit = async (data: FormValues) => {
  try {
    await loginUser(data);
    alert("Login Successful!");

    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/home`);
    } else {
      console.warn("User ID not found after login.");
    }

    reset();
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="User Name" {...register("userName")} required />
        <TextField label="Password" type="password" {...register("password")} required />
        <Stack direction="row" spacing={2} mt={2}>
        <Button type="submit" variant="contained" color="primary">Login</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/Register")}>Go to Register</Button>

        </Stack>
      </Box>
    </Container>
  );
};

export default LoginForm;