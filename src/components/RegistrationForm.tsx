import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAgents, registerUser } from "../api/API"; 

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agentId: "",
  });

const { data: agents, isLoading: isQueryLoading, error } = useQuery({
  queryKey: ["agents"],
  queryFn: fetchAgents,
});

  const {
    mutate,
    isPending: isSubmitting,    
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: registerUser,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      agentId: Number(formData.agentId),
    });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          📝 Register User
        </Typography>

        {isQueryLoading && <CircularProgress />}
        {error && <Alert severity="error">Failed to fetch agent list.</Alert>}
        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            User registered successfully!
          </Alert>
        )}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to register. Try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                required
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
                label="Email"
                name="email"
                type="email"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
                label="Password"
                name="password"
                type="password"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                required
                select
                name="agentId"
                label="Select Agent"
                fullWidth
                onChange={handleChange}
              >
                {agents &&
                  agents.map((agent: any) => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.name} ({agent.companyName})
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid size={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default RegisterForm;
