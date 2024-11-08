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
import authReducer from "../redux/auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
