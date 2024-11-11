import { useNavigate } from 'react-router-dom';
import css from './Banner.module.css';

const Banner = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/teachers');
  };

  return (
    <section className={css.banner}>
      <div className={css.textSection}>
        <h1>
          Unlock your potential with the best <span className={css.highlight}>language</span> tutors
        </h1>
        <p>
          Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
        </p>
        <button className={css.getStartedButton} onClick={handleGetStartedClick}>
          Get started
        </button>
      </div>
      <div className={css.imageSection}>
        <div className={css.image}></div>
      </div>
      <div className={css.statsSection}>
        <div className={css.stat}>
          <h3>32,000 +</h3>
          <p>Experienced tutors</p>
        </div>
        <div className={css.stat}>
          <h3>300,000 +</h3>
          <p>5-star tutor reviews</p>
        </div>
        <div className={css.stat}>
          <h3>120 +</h3>
          <p>Subjects taught</p>
        </div>
        <div className={css.stat}>
          <h3>200 +</h3>
          <p>Tutor nationalities</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
