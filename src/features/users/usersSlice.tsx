import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //FIXED: specify payload type for addUserRequest
    addUserRequest: (
      state,
     _action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserRequest: (state, _action: PayloadAction<User>) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u
      );
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
