import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../api/productApi";
import {useNavigate} from "react-router-dom";

type FormValues = {
  name: string;
  role: string;
  userName: string;
  password: string;
};

const RegisterForm = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      role: "",
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser(data);
      alert("Registration Successful!");
      navigate("/verify");
      reset();
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="Full Name" {...register("name")} required />
        <TextField label="User Name" {...register("userName")} required />
        <TextField label="Password" type="password" {...register("password")} required />
        
        <Controller
          name="role"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Role" select {...field} required>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            </TextField>
          )}
        />
        <Stack direction="row" spacing={2} mt={2}>
        <Button type="submit" variant="contained" color="primary">Register</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/Login")}>Go to Login</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default RegisterForm;
