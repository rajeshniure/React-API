import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "./app/store";
import { fetchUsersRequest } from "./features/users/usersSlice";
import { Button, CircularProgress, Container, List, ListItem, Typography } from "@mui/material";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Redux Saga User Fetch
      </Typography>

      <Button
        variant="contained"
        onClick={() => dispatch(fetchUsersRequest())}
        sx={{ mb: 2 }}
      >
        Fetch Users
      </Button>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {users.map((user) => (
          <ListItem key={user.id}>{user.name} ({user.email})</ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
