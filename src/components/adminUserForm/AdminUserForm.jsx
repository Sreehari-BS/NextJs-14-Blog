"use client"

import styles from "./adminUserForm.module.css"
import { useFormState } from "react-dom";
import { addUser } from "@/lib/actions/actions";

const AdminUserForm = () => {
    const [state, formAction] = useFormState(addUser, undefined);
  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input type="text" name="userName" placeholder="user Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="text" name="img" placeholder="img" />
      <select name="isAdmin">
        <option value="">Is Admin</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button>Add</button>
      {state && state.error}
    </form>
  )
}

export default AdminUserForm