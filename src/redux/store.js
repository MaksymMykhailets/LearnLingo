import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import filtersReducer from "./filters/slice";
import favoritesReducer from "./favorites/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], 
};

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["language", "level", "priceRange"],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorites"], 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: persistedFiltersReducer,
    favorites: persistedFavoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
