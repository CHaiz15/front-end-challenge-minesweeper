import styles from './page.module.css';
import { initializeGrid } from '@/lib/minesweeper';
import { Grid } from './components/Grid';

export default function Home() {
  const gridData = initializeGrid();
  return (
    <div className={styles.page}>
      <h2>Minesweeper</h2>
      <Grid gridData={gridData} />
    </div>
  );
};
