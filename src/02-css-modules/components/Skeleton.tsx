import React from 'react';
import styles from './Skeleton.module.css';

export default function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={`${styles.line} ${styles.titleLine}`}></div>
          <div className={`${styles.line} ${styles.titleLine} ${styles.short}`}></div>
        </div>
        <div className={`${styles.line} ${styles.priceLine}`}></div>
        <div className={`${styles.line} ${styles.ratingLine}`}></div>
        <div className={styles.button}></div>
      </div>
    </div>
  );
}