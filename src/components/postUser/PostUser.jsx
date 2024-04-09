import styles from "./postUser.module.css";
import { getSingleUser } from "@/lib/datas/userData";
import Image from "next/image"

const PostUser = async ({ userId }) => {
  const user = await getSingleUser(userId);
  return (
    <div className={styles.container}>
        <Image
        src={user.img ? user.img : "/noavatar.png"}
        alt="avatarImage"
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.userName}>{user.userName}</span>
      </div>
    </div>
  );
};

export default PostUser;
