import defaultStyles from './SearchBar.module.css';

function SearchBar({customStyles,onSearch}) {
    let styles = customStyles;
    if(styles === undefined) {
        styles = defaultStyles;
    }
  return (
    <div className={styles.mainContainer}>
    <div className={styles.searchBarContainer}>
      <input  className={styles.searchBar} type="text" placeholder="Search..." />
      <button type="submit" className={styles.button}>Search</button>
    </div>
    </div>
  );
}
export default SearchBar;