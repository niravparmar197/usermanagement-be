import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../App";

interface UsersListInterface {
  users: UserInterface[];
}

const initialState: UsersListInterface = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload: { name, email, mobileNumber, password } }) => {
        console.log('{ name, email, mobileNumber, password }: ', { name, email, mobileNumber, password });
      state.users.push({
          name, email, mobileNumber, password,
          id: ""
      });
    },
    deleteUser: (state, { payload: { userId } }) => {
      state.users = state.users.filter((user) => user.id !== userId);
    },
    editUser: (state, { payload: { editedUser } }) => {
      console.log(editedUser);
      state.users = state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user
      );
    },
    toggleUser: (state, { payload: { userId } }) => {
      state.users = state.users.map((user) =>
        user.id === userId ? { ...user } : user
      );
    },
  },
});
export const { addUser, deleteUser, editUser, toggleUser } = userSlice.actions;
export default userSlice.reducer;
