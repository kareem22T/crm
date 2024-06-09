// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './features/auth/authSlice';
import clientsReducer from './features/clients/clientSlice'; // Correctly import
import branchesReducer from './features/branchs/branchSlice'; // Correctly import
import partnersReducer from './features/parteners/partnerSlice'; // Correctly import
import contractReducer from './features/contracts/contractSlice'; // Correctly import
import authorizationsReducer from './features/authorizations/authorizationSlice'; // Correctly import
import socialInsurancesReducer from './features/socialInsurances/socialInsuranceSlice'; // Correctly import
import generalTaxesReducer from './features/generalTaxes/generalTaxSlice'; // Correctly import
import taxExaminationsReducer from './features/taxExaminations/taxExaminationSlice'; // Correctly import
import vatsReducer from './features/vats/vatSlice'; // Correctly import

const rootReducer = combineReducers({
  auth: authReducer,
  clients: clientsReducer, 
  branches: branchesReducer, 
  partners: partnersReducer,
  contracts: contractReducer, 
  authorizations: authorizationsReducer, 
  socialInsurances: socialInsurancesReducer, 
  generalTaxes: generalTaxesReducer, 
  taxExaminations: taxExaminationsReducer, 
  vats: vatsReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
