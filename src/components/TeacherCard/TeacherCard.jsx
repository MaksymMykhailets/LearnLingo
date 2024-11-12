import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../db/firebaseConfig';
import { ref, update, onValue, remove } from 'firebase/database';
import css from './TeacherCard.module.css';
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

const TeacherCard = ({ teacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastShown, setToastShown] = useState(false); 
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      const favoriteRef = ref(database, `users/${user.uid}/favorites/${teacher.name}-${teacher.surname}`);
      onValue(favoriteRef, (snapshot) => {
        setIsFavorite(snapshot.exists());
      });
    }
  }, [user, teacher]);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFavoriteClick = () => {
    if (!user) {
      if (!toastShown) {
        toast.error('This feature is available only for authenticated users.');
        setToastShown(true);
        setTimeout(() => setToastShown(false), 3000);
      }
      return;
    }

    const favoriteRef = ref(database, `users/${user.uid}/favorites/${teacher.name}-${teacher.surname}`);
    if (isFavorite) {
      remove(favoriteRef);
    } else {
      update(favoriteRef, {
        name: teacher.name,
        surname: teacher.surname,
        languages: teacher.languages,
        price_per_hour: teacher.price_per_hour,
        rating: teacher.rating,
        avatar_url: teacher.avatar_url,
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={css.card}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className={css.avatarSection}>
        <img src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} className={css.avatar} />
        <span className={css.onlineStatus}></span>
      </div>

      <div className={css.infoSection}>
        <div className={css.statsContainer}>
          <div className={css.teacherInfo}>
            <h2 className={css.languages}>Languages</h2>
            <h2 className={css.name}>{teacher.name} {teacher.surname}</h2>
          </div>
          <div className={css.stats}>
            <span className={css.stat}><IoBookOutline size={16} /> Lessons online: {teacher.lessons_done}</span>
            <span className={css.stat}><FaStar size={16} className={css.star} /> Rating: {teacher.rating.toFixed(1)}</span>
            <span className={css.stat}>Price / 1 hour: <span className={css.money}>{teacher.price_per_hour}$</span></span>
            <span onClick={handleFavoriteClick} className={css.favoriteIcon}>
              {isFavorite ? <FaHeart size={16} color='#E0A39A' /> : <FaRegHeart size={16} />}
            </span>
          </div>
        </div>

        <div className={css.detailsContainer}>
          <p className={css.infoText}><span className={css.label}>Speaks:</span> {teacher.languages.join(', ')}</p>
          <p className={css.infoText}><span className={css.label}>Lesson info:</span> {teacher.lesson_info}</p>
          <p className={css.infoText}><span className={css.label}>Conditions:</span> {teacher.conditions.join('; ')}</p>
        </div>
        
        <button onClick={handleReadMore} className={css.readMore}>
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
        
        {isExpanded && (
          <div className={css.expandedSection}>
            <p className={css.experience}>{teacher.experience}</p>
            <div className={css.reviews}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={css.review}>
                  <div className={css.reviewHeader}>
                    <p className={css.reviewerInfo}>
                      <span className={css.reviewerName}>{review.reviewer_name}</span>
                      <span className={css.reviewRating}>
                        <FaStar size={14} className={css.star} />
                        <span className={css.ratingValue}>{review.reviewer_rating.toFixed(1)}</span>
                      </span>
                    </p>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={css.levels}>
          {teacher.levels.map(level => (
            <span key={level} className={css.level}>#{level}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
