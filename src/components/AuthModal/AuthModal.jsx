import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../db/firebaseConfig';
import { setUser } from '../../redux/auth/slice';
import { clearFilters } from '../../redux/filters/slice';
import { clearFavorites } from '../../redux/favorites/slice';
import { addUser } from '../../redux/auth/operations';
import css from './AuthModal.module.css';
import { HiOutlineEyeOff } from "react-icons/hi"; 
import { LuEye } from "react-icons/lu"; 
import { IoCloseOutline } from "react-icons/io5";

const loginSchema = yup.object().shape({
  email: yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email should contain only latin characters and end with @gmail.com"
    )
    .required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const registrationSchema = yup.object().shape({
  name: yup.string()
    .matches(
      /^[A-Za-z\s]+$/, 
      "Name should not contain numbers or special characters"
    )
    .min(2, 'Name should be at least 2 characters')
    .max(20, 'Name should be at most 20 characters')
    .required('Name is required'),
  email: yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email should contain only latin characters and end with @gmail.com"
    )
    .required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AuthModal = ({ isOpen, onClose, isRegister }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(isRegister ? registrationSchema : loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleTrim = (field) => {
    const value = getValues(field); 
    setValue(field, value.trim(), { shouldValidate: true }); 
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setAuthError(""); 
  
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        await addUser(user.uid, { displayName: name, email });
        dispatch(setUser({ uid: user.uid, email: user.email, displayName: name }));
        dispatch(clearFilters());
        dispatch(clearFavorites());
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        dispatch(clearFilters());
        dispatch(clearFavorites());
      }
      onClose();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setAuthError("Invalid credentials. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setAuthError("Too many unsuccessful login attempts. Please try again later.");
      } else {
        setAuthError("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <IoCloseOutline size={32} color="#121417"/>
        </button>
        
        <h2 className={css.title}>{isRegister ? 'Registration' : 'Log In'}</h2>
        <p className={css.greeting}>{isRegister ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information' : 'Welcome back! Please enter your credentials to access your account and continue your search for a teacher.'}</p>
        
        {authError && <p className={css.authError}>{authError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className={css.authForm}>
          {isRegister && (
            <div className={css.formGroup}>
              <input 
                type="text" 
                {...register('name')} 
                className={css.input} 
                placeholder='Name'
                onBlur={() => handleTrim('name')}
              />
              {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
            </div>
          )}
          <div className={css.formGroup}>
            <input 
              type="email" 
              {...register('email')} 
              className={css.input} 
              placeholder='Email'
              onBlur={() => handleTrim('email')}
            />
            {errors.email && <p className={css.errorText}>{errors.email.message}</p>}
          </div>
          <div className={css.formGroup}>
            <div className={css.inputWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                {...register('password')} 
                className={css.input} 
                placeholder='Password' 
                onBlur={() => handleTrim('password')}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <LuEye size={20} /> : <HiOutlineEyeOff size={20} />}
              </span>
            </div>
            {errors.password && <p className={css.errorText}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={css.submitButton}>
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
