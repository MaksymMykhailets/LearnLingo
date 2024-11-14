import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../db/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const favoritesRef = ref(database, `users/${user.uid}/favorites`);
      onValue(favoritesRef, (snapshot) => {
        const favoritesData = snapshot.val() || {};
        const favoritesList = Object.values(favoritesData);
        setFavorites(favoritesList);
      });
    }
  }, [user]);

  return (
    <div className={css.favoritesPage}>
      <div className={css.cardsContainer}>
        {favorites.length > 0 ? (
          favorites.map((teacher) => (
            <TeacherCard key={teacher.name} teacher={teacher} />
          ))
        ) : (
          <p>No favorite teachers yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
