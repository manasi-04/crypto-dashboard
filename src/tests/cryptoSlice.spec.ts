import cryptosSlice, { setCryptosData, setLoading, setError, updateCryptoPrices } from '../pages/crypto-table/CryptoTableSlice';
import { CryptoState } from '../types/crypto-state';

describe('cryptoSlice', () => {
    const dummyAction = { type: 'DUMMY_ACTION' };
    const initialState: CryptoState = {
        cryptoCurrencies: [],
        favorites: [],
        loading: false,
        error: null,
        sortConfig: { key: 'name', direction: 'asc' },
    };
    it('should handle initial state', () => {
        expect(cryptosSlice(undefined, dummyAction)).toEqual(initialState);
    });

    it('should handle setCryptosData', () => {
        expect(
            cryptosSlice(initialState, setCryptosData([{ id: 'bitcoin', name: 'Bitcoin' }]))
        ).toEqual({
            ...initialState,
            cryptoCurrencies: [{ id: 'bitcoin', name: 'Bitcoin' }],
            loading: false,
        });
    });

    it('should handle setLoading', () => {
        expect(cryptosSlice(initialState, setLoading(true))).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('should handle setError', () => {
        expect(cryptosSlice(initialState, setError(true))).toEqual({
            ...initialState,
            error: true,
        });
    });

    it('should handle updateCryptoPrices', () => {
        const previousState = {
            ...initialState,
            cryptoCurrencies: [{id:"bitcoin",rank:"1",symbol:"BTC",name:"Bitcoin",supply:"19731868.0000000000000000",maxSupply:"21000000.0000000000000000",marketCapUsd:"1360145378547.1934242453050432",volumeUsd24Hr:"7962692971.7117448421294673",priceUsd:"68931.4046975782234224",changePercent24Hr:"1.8525218039634776",vwap24Hr:"68076.6680165953522432",explorer:"https://blockchain.info/"}],
        };
        const priceUpdates = { bitcoin: '12000' };
        expect(cryptosSlice(previousState, updateCryptoPrices(priceUpdates))).toEqual({
            ...previousState,
            cryptoCurrencies: [{ ...previousState.cryptoCurrencies[0], id: 'bitcoin', priceUsd: '12000' }],
        });
    });
});
