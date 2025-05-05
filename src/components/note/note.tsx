import { NoteModel } from '../../types';
import styles from './note.module.scss';

const Note = ({ title }: NoteModel) => {
  return (
    <div className={styles.item}>
      <div className={styles.text}>{title}</div>
    </div>
  );
};

export default Note;
