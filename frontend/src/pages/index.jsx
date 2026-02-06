import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout"

export default function Home() {

  const router = useRouter();
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>


          <div className={styles.mainContainer_left}>
            <p>A Smarter Way to Stay in Touch with Your Team.</p>

            <p>Your Team. One Network. Infinite Possibilities</p>

            <div onClick={() => {
              router.push("/login");
            }}className={styles.buttonJoin}>
              <p>Join Now</p>
            </div>

          </div>

          <div className={styles.mainContainer_rigth}>
              <img src="images/connectone.jpg" alt="" style={{ width: '400px', height: '490px', objectFit: 'contain' }} />
          </div>


        </div>


        
      </div>
    </UserLayout>
  );
}
