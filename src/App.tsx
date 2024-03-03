import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./components/EditUser/EditUser";
import FilterUser from "./components/FilterUser/FilterUser";
import DataTable from "./components/UserList/UserList";

export interface UserInterface {
  id: string;
  name?: string; // Assuming you've added name, email, etc., to your UserInterface
  email?: string;
  mobileNumber?: string;
  password?: string; // Note: Storing passwords in plain text is generally unsafe, consider this for demo purposes only

}

const App = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [editUser, setEditUser] = useState<UserInterface | null>(null);
  const [userFilterValue, setUserFilterValue] = useState("all");

  const getUserFilterValue = (filterValue: string) =>
    setUserFilterValue(filterValue);
  const getEditUser = (editUser: UserInterface) => setEditUser(editUser);

  return (
    <main className="">
      <div className="">
        <div className="">
          <h1 className="app__title">User App</h1>
        </div>
        <div className="">
          {editUser?.id ? (
            <EditUser editUser={editUser as any} setEditUser={setEditUser} />
          ) : (
            <AddUser />
          )}
          <FilterUser getUserFilterValue={getUserFilterValue} />
        </div>
        <DataTable
          //  users={users}
          //  userFilterValue={userFilterValue}
          //  getEditUser={getEditUser}
          //  setEditUser={setEditUser}
          //  editUser={editUser}
        />
      </div>
    </main>
  );
};

export default App;
