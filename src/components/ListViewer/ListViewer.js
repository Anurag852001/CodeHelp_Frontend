import styles from './ListViewer.module.css';

function ListViewer({ items, headers,onCheckBoxCheckedHandler}) {
  return (
    <div className={styles.listViewerContainer}>
      <div className={`${styles.row} ${styles.headerRow}`}>
        {headers.map((header, index) => (
          <div key={index} className={styles.cell}>
            {header.name}
          </div>
        ))}
      </div>

      {items.map((item, rowIndex) => (
        
        <div key={rowIndex} className={styles.rowContainer}>
          <input type="checkbox" className={styles.checkbox} onClick={onCheckBoxCheckedHandler} />
          <div className={styles.row}>
        
          {headers.map((header, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`} className={styles.cell} >
              {item[header.key]}
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListViewer;
