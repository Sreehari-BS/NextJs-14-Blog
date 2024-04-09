import PostCard from "@/components/postCard/PostCard";
import Styles from "./blog.module.css";
// import { getAllPosts } from "@/lib/datas/postData";

const getAllPosts = async() => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}});
  if(!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json()
}

const BlogPage = async () => {
  const posts = await getAllPosts();
  return (
    <div className={Styles.container}>
      {posts.map((post) => (
        <div className={Styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
