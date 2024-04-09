import styles from "./singlePost.module.css";
import Image from "next/image";
// import { getSinglePost } from "@/lib/datas/postData";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const post = await getSinglePost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

const getSinglePost = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const SinglePostPage = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {post.img && (
          <Image
            src={post.img}
            alt="singlePostImage"
            fill
            className={styles.img}
          />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostUser userId={post.userId} />
        </Suspense>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>08.04.2024</span>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
