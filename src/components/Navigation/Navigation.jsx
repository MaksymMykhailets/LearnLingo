import { Link, NavLink } from 'react-router-dom';
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../db/firebaseConfig';
import { clearUser } from '../../redux/auth/slice';
import css from './Navigation.module.css';

const Navigation = ({ onLoginClick, onRegisterClick }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={css.navbar}>
      <div className={css.logo}>
        <span className={css.icon}></span>
        <Link to="/" className={css.brandName}>LearnLingo</Link>
      </div>
      <div className={css.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${css.navLink} ${css.active}` : css.navLink)}
        >
          Home
        </NavLink>
        <NavLink
          to="/teachers"
          className={({ isActive }) => (isActive ? `${css.navLink} ${css.active}` : css.navLink)}
        >
          Teachers
        </NavLink>
        {user && (
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? `${css.navLink} ${css.active}` : css.navLink)}
          >
            Favorites
          </NavLink>
        )}
      </div>
      <div className={css.authButtons}>
        {user ? (
          <button onClick={handleLogout} className={css.logoutButton}>
            Log out
          </button>
        ) : (
          <>
            <button onClick={onLoginClick} className={css.loginButton}>
              <FiLogIn size={18} />
              <span>Log in</span>
            </button>
            <button onClick={onRegisterClick} className={css.registerButton}>Registration</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
