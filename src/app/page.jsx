import styles from "./home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          Lorem ipsum, consectetur adipisicing elit. Ullam
          tenetur accusantium ratione, soluta numquam molestiae, veritatis nostrum exercitationem.
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brandContainer}>
          <Image
            src="/brands.png"
            alt="brandImg"
            fill
            className={styles.brandImg}
          />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src="/hero.gif" alt="heroImg" fill className={styles.heroImg} />
      </div>
    </div>
  );
}
