import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.inner}>
      <div>
        <h2 className={styles.title}>404</h2>
        <h3 className={styles.text}>Page not found</h3>
      </div>
    </div>
  );
};

export default NotFound;
