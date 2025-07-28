import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className="text-3xl text-center text-orange-500 font-bold underline">
        Food Order App
      </h1>
    </div>
  );
}
