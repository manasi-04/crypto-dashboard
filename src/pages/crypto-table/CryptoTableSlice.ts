import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFavorites, getSortConfig } from '../../helpers/crypto';
import { CryptoCurrency } from '../../types/crypto-currency';
import { CryptoState } from '../../types/crypto-state';

const initialState: CryptoState = {
  cryptoCurrencies: [],
  favorites: getFavorites(),
  sortConfig: getSortConfig(),
  loading: false,
  error: null,
}
export const cryptosSlice = createSlice({
  name: 'cryptoTable',
  initialState: initialState,
  reducers: {
    setCryptosData: (state, action) => {
      state.cryptoCurrencies = action?.payload;
      state.loading = false;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action?.payload);
    },
    removeFavorite: (state, action) => {
      const newData = state?.favorites?.filter((fav: string) => fav !== action?.payload);
      state.favorites = newData;
    },
    setLoading: (state, action) => {
      state.loading = action?.payload;
    },
    setError: (state, action) => {
      state.error = action?.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action?.payload;
    },
    updateCryptoPrices: (state, action: PayloadAction<{ [key: string]: string }>) => {
      const priceUpdates = action?.payload;
      const newData = state?.cryptoCurrencies?.map((crypto: CryptoCurrency) => {
        if (priceUpdates[crypto.id]) {
          return {
            ...crypto,
            priceUsd: priceUpdates[crypto.id],
          };
        }
        return crypto;
      });
      state.cryptoCurrencies = newData;
    }
  }
});

export const { setCryptosData, setError, setLoading, addFavorite, removeFavorite, setSortConfig, updateCryptoPrices } = cryptosSlice.actions

export default cryptosSlice.reducer;