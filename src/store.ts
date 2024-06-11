import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './features/auth/authSlice';
import clientsReducer from './features/clients/clientSlice';
import branchesReducer from './features/branchs/branchSlice';
import partnersReducer from './features/parteners/partnerSlice';
import contractReducer from './features/contracts/contractSlice';
import authorizationsReducer from './features/authorizations/authorizationSlice';
import socialInsurancesReducer from './features/socialInsurances/socialInsuranceSlice';
import generalTaxesReducer from './features/generalTaxes/generalTaxSlice';
import taxExaminationsReducer from './features/taxExaminations/taxExaminationSlice';
import vatsReducer from './features/vats/vatSlice';
import portalReducer from './features/portal/portalSlice';
import invoiceReducer from './features/invoice/invoiceSlice';

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
  portal: portalReducer, 
  invoice: invoiceReducer, 
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
      serializableCheck: false
    }).concat(),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store }; // Ensure the store is exported correctly
export default store;
