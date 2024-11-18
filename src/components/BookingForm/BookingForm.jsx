import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './BookingForm.module.css';
import { IoCloseOutline } from "react-icons/io5";
import { useEffect } from 'react';

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should not contain numbers or special characters")
    .min(2, 'Name should be at least 2 characters')
    .max(30, 'Name should be at most 30 characters'),
  email: yup.string()
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email should contain only latin characters and end with @gmail.com"),
  phoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits"),
});

const BookingForm = ({ teacher, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched', 
  });

  const handleTrim = (field) => {
    const value = getValues(field);
    setValue(field, value.trim(), { shouldValidate: true });
  };

  const onSubmit = () => {
    onClose(); 
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <IoCloseOutline size={32} />
        </button>

        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.subtitle}>Our experienced tutor will assess your current language level and discuss your learning goals.</p>
        <div className={css.teacherInfo}>
          <img src={teacher.avatar_url} alt={teacher.name} className={css.teacherAvatar} />
          <div className={css.teacherDetails}>
            <p className={css.teacherLabel}>Your teacher</p>
            <h3 className={css.teacherName}>{teacher.name} {teacher.surname}</h3>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.fieldGroup}>
            <span className={css.question}>What is your main reason for learning English?</span>
            <p className={css.errorRadio}>{errors.reason?.message}</p>
            <div className={css.radioGroup}>
              {['Career and business', 'Lesson for kids', 'Living abroad', 'Exams and coursework', 'Culture, travel or hobby'].map(option => (
                <div key={option} className={css.radioOption}>
                  <input type="radio" value={option} {...register("reason")} />
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={css.formWrapper}>
            <div className={css.formGroup}>
              <div className={css.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  {...register("fullName")} 
                  className={css.input} 
                  onBlur={() => handleTrim("fullName")}
                />
              </div>
              {errors.fullName && <p className={css.error}>{errors.fullName.message}</p>}
            </div>

            <div className={css.formGroup}>
              <div className={css.inputWrapper}>
                <input 
                  type="email" 
                  placeholder="Email" 
                  {...register("email")} 
                  className={css.input} 
                  onBlur={() => handleTrim("email")}
                />
              </div>
              {errors.email && <p className={css.error}>{errors.email.message}</p>}
            </div>

            <div className={css.formGroup}>
              <div className={css.inputWrapper}>
                <input 
                  type="text" 
                  placeholder="Phone number" 
                  {...register("phoneNumber")} 
                  className={css.input} 
                  onBlur={() => handleTrim("phoneNumber")}
                />
              </div>
              {errors.phoneNumber && <p className={css.error}>{errors.phoneNumber.message}</p>}
            </div>
          </div>

          <button type="submit" className={css.submitButton}>Book</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
