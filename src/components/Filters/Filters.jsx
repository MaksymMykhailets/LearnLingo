import { useDispatch, useSelector } from 'react-redux';
import { setLanguageFilter, setLevelFilter, setPriceFilter, clearFilters } from '../../redux/filters/slice';
import { selectLanguageFilter, selectLevelFilter, selectPriceFilter } from '../../redux/filters/selectors';
import css from './Filters.module.css';

const Filters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const languageFilter = useSelector(selectLanguageFilter);
  const levelFilter = useSelector(selectLevelFilter);
  const priceRangeFilter = useSelector(selectPriceFilter);

  const handleLanguageChange = (e) => {
    dispatch(setLanguageFilter(e.target.value));
    onFilterChange();
  };

  const handleLevelChange = (e) => {
    dispatch(setLevelFilter(e.target.value));
    onFilterChange();
  };

  const handlePriceChange = (e) => {
    dispatch(setPriceFilter(e.target.value));
    onFilterChange();
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    onFilterChange();
  };

  return (
    <div className={css.filtersContainer}>
      <div className={css.filter}>
        <label>Languages</label>
        <select value={languageFilter} onChange={handleLanguageChange}>
          <option value="">All</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="Italian">Italian</option>
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
          <option value="Korean">Korean</option>
          <option value="Mandarin Chinese">Mandarin Chinese</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
      </div>

      <div className={css.filter}>
        <label>Level of knowledge</label>
        <select value={levelFilter} onChange={handleLevelChange}>
          <option value="">All</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
          <option value="C1 Advanced">C1 Advanced</option>
          <option value="C2 Proficient">C2 Proficient</option>
        </select>
      </div>

      <div className={css.filter}>
        <label>Price</label>
        <select value={priceRangeFilter} onChange={handlePriceChange}>
          <option value="">All</option>
          <option value="20-25">20$ - 25$</option>
          <option value="25-30">25$ - 30$</option>
          <option value="30-35">30$ - 35$</option>
        </select>
      </div>

      <div className={css.clearButtonContainer}>
        <label>Clear Filters</label>
        <button onClick={handleClearFilters} className={css.clearButton}>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filters;
