import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.module.css";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("../../pages/TeachersPage/TeachersPage"));
const FavoritesPage = lazy(() => import("../../pages/FavoritesPage/FavoritesPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
