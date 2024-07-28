import { CryptoState, CryptoDetailsState } from "./crypto-state";

export interface AppState {
    cryptoData: CryptoState;
    cryptoDetails: CryptoDetailsState;
}