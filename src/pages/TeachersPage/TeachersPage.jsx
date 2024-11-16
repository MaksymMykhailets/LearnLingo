import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTeachers } from '../../redux/teachers/operations';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import Filters from '../../components/Filters/Filters';
import toast, { Toaster } from 'react-hot-toast';
import css from './TeachersPage.module.css';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState(4);
  const [showToastOnEmpty, setShowToastOnEmpty] = useState(false);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setTeachers(Object.values(data));
      setFilteredTeachers(Object.values(data));
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtersApplied = filters.language || filters.level || filters.priceRange;

    const applyFilters = () => {
      const filtered = teachers.filter((teacher) => {
        const matchesLanguage =
          !filters.language || teacher.languages.includes(filters.language);
        const matchesLevel =
          !filters.level || teacher.levels.includes(filters.level);
        const matchesPrice =
          !filters.priceRange ||
          (teacher.price_per_hour >= Number(filters.priceRange.split('-')[0]) &&
            teacher.price_per_hour <= Number(filters.priceRange.split('-')[1]));
        return matchesLanguage && matchesLevel && matchesPrice;
      });

      setFilteredTeachers(filtered);

      if (filtersApplied && filtered.length === 0 && showToastOnEmpty) {
        toast.error('No teachers found for the selected filters');
      }
    };

    applyFilters();
  }, [filters, teachers, showToastOnEmpty]);

  const handleFilterChange = () => {
    setShowToastOnEmpty(true); 
  };

  const loadMoreTeachers = () => {
    setVisibleTeachers((prevVisible) => prevVisible + 4);
  };

  return (
    <div className={css.page}>
      <Toaster position="top-center" reverseOrder={false} />
      <Filters onFilterChange={handleFilterChange} />
      <div className={css.teachersGrid}>
        {filteredTeachers.slice(0, visibleTeachers).map((teacher) => (
          <TeacherCard key={`${teacher.name}-${teacher.surname}`} teacher={teacher} />
        ))}
      </div>
      {visibleTeachers < filteredTeachers.length && (
        <div className={css.buttonContainer}>
          <button onClick={loadMoreTeachers} className={css.loadMoreButton}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
