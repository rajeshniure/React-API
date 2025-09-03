import { type User } from "./usersSlice";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsersApi = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const addUserApi = async (user: { name: string; email: string }) => {
  const res = await fetch(BASE_URL, { method: "POST", body: JSON.stringify(user), headers: { "Content-Type": "application/json" }});
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

export const deleteUserApi = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return id;
};

export const updateUserApi = async (user: User) => {
  const res = await fetch(`${BASE_URL}/${user.id}`, { method: "PATCH", body: JSON.stringify(user), headers: { "Content-Type": "application/json" }});
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};
