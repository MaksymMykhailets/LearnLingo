import { useEffect, useState } from 'react';
import { getTeachers } from '../../redux/teachers/operations';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import css from './TeachersPage.module.css';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState(4);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setTeachers(Object.values(data));
    };
    fetchTeachers();
  }, []);

  const loadMoreTeachers = () => {
    setVisibleTeachers((prevVisible) => prevVisible + 4);
  };

  return (
    <div className={css.page}>
      <div className={css.teachersGrid}>
        {teachers.slice(0, visibleTeachers).map((teacher) => (
          <TeacherCard key={`${teacher.name}-${teacher.surname}`} teacher={teacher} />
        ))}
      </div>
      {visibleTeachers < teachers.length && (
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
