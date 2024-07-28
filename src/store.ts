import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './pages/crypto-table/CryptoTableSlice';
import cryptoDetailsReducer from './pages/crypto-details/cryptoDetailsSlice';

export default configureStore({
  reducer: {
    cryptoData: cryptoReducer,
    cryptoDetails: cryptoDetailsReducer,
  }
});
