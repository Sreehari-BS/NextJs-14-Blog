import { getAllUsers } from "@/lib/datas/userData"
import styles from "./adminUsers.module.css"
import { deleteUser } from "@/lib/actions/actions"
import Image from "next/image"

const AdminUsers = async () => {
    const users = await getAllUsers()
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.detail}>
            <Image src={user.img || "/noAvatar.png"} width={50} height={50} />
            <span className={styles.postTitle}>{user.userName}</span>
          </div>
          <form action={deleteUser}>
            <input type="hidden" name="id" value={user.id} />
            <button className={styles.userButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default AdminUsers