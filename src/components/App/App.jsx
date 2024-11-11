import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Loader from "../Loader/Loader";
import Navigation from "../Navigation/Navigation";
import AuthModal from "../AuthModal/AuthModal";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("../../pages/TeachersPage/TeachersPage"));
const FavoritesPage = lazy(() => import("../../pages/FavoritesPage/FavoritesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const openLoginModal = () => {
    setIsRegister(false);
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsRegister(true);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Navigation onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} isRegister={isRegister} />
      )}
    </Suspense>
  );
};

export default App;
