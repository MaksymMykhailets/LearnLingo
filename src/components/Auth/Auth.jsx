import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../db/firebaseConfig';
import { clearUser } from '../../redux/auth/slice';
import { clearFilters } from '../../redux/filters/slice';
import { clearFavorites } from '../../redux/favorites/slice';
import AuthModal from '../AuthModal/AuthModal';

const Auth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true); 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const openRegisterModal = () => {
    setIsRegister(true);
    setIsModalOpen(true);
  };

  const openLoginModal = () => {
    setIsRegister(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(clearFilters());
      dispatch(clearFavorites());
      window.location.reload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.displayName || user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={openLoginModal}>Log In</button>
          <button onClick={openRegisterModal}>Register</button>
        </>
      )}

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        isRegister={isRegister} 
      />
    </div>
  );
};

export default Auth;
