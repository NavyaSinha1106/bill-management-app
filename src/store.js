import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { configureStore } from "@reduxjs/toolkit";

import seedData from "./seedData";

import { reducer } from "./reducer";

const initialState = { seedData: seedData };

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const appReducer = combineReducers({
  seedData: reducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
});

export const persistedStore = persistStore(store);
