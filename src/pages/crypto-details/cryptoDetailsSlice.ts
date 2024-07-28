import { createSlice } from '@reduxjs/toolkit';

export const cryptoDetailsSlice = createSlice({
  name: 'cryptoDetails',
  initialState: {
    details: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCryptoDetails: (state, action) => {
      state.details = action?.payload;
      state.loading = false;
    },
    setCryptoHistory: (state, action) => {
        state.history = action?.payload;
    },
    setLoading: (state, action) => {
      state.loading = action?.payload;
    },
    setError: (state, action) => {
      state.error = action?.payload;
    },
  },
})

export const { setCryptoDetails, setCryptoHistory, setLoading, setError } = cryptoDetailsSlice.actions

export default cryptoDetailsSlice.reducer;