import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  CssBaseline,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import { fetchAgents } from "../api/API";

function AgentList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          🕵️ Agent List
        </Typography>

        {isLoading && <CircularProgress />}
        {error && (
          <Alert severity="error">Failed to fetch agents. Try again.</Alert>
        )}

        {data && (
          <Grid container spacing={3}>
            {data.map((agent: any) => (
              <Grid size={4} key={agent.id}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {agent.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {agent.companyName}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      📍 {agent.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {agent.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default AgentList;
