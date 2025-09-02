import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  loading: boolean;
  error: string | null;
  users: User[];
}

const initialState: UsersState = {
  loading: false,
  error: null,
  users: [],
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
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
