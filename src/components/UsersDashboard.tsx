import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {type RootState, type AppDispatch } from "../app/store";
import {
  fetchUsersRequest, addUserRequest, deleteUserRequest, updateUserRequest, type User
} from "../features/users/usersSlice";

import {
  Button, Container, List, ListItem, TextField, Typography, CircularProgress
} from "@mui/material";
 


export default function UsersDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addUserRequest({ name, email }));
    setName(""); setEmail("");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUserRequest(id));
  };

  const handleUpdate = (user: User) => {
    const newName = prompt("New Name:", user.name);
    const newEmail = prompt("New Email:", user.email);
    if (newName && newEmail) {
      dispatch(updateUserRequest({ ...user, name: newName, email: newEmail }));
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      <TextField label="Name" value={name} onChange={e => setName(e.target.value)} sx={{ mr: 2 }} />
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mr: 2 }} />
      <Button variant="contained" onClick={handleAdd}>Add User</Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {users.map(u => (
          <ListItem key={u.id} sx={{ display: "flex", justifyContent: "space-between" }}>
            {u.name} ({u.email})
            <div>
              <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleUpdate(u)}>Edit</Button>
              <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(u.id)}>Delete</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
