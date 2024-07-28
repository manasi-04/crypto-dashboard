import { CryptoCurrency, CryptoHistory } from "./crypto-currency";

export interface CryptoState {
    cryptoCurrencies: CryptoCurrency[];
    favorites: string[];
    loading: boolean;
    error: boolean | null;
    sortConfig: { key: keyof CryptoCurrency, direction: 'asc' | 'desc' }
}

export interface CryptoDetailsState {
    details: CryptoCurrency | null;
    history: CryptoHistory[];
    loading: false;
    error: boolean | null;
}

export type AppDispatch = typeof store.dispatch;
