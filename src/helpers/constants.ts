import { formatCurrency } from "./crypto";

export const tableColumns = ["Symbol", "Name", "Price", "Market Cap", "Favorites"];
export const itemsPerPage = 10;
export const cryptoApiUrl = 'https://api.coincap.io/v2/assets';
export const getCryptoDetailsApiUrl = (id: string | undefined) => `https://api.coincap.io/v2/assets/${id}`;
export const getCryptoHistoryApiUrl = (id: string | undefined) => `https://api.coincap.io/v2/assets/${id}/history?interval=d1`;
export const millisecondsInADay = 24 * 60 * 60 * 1000;
export const currentEpochTime = Date.now();
export const options = {
    scales: {
        y: {
            beginAtZero: false,
            ticks: {
                callback: function (tickValue: string | number) {
                    if (typeof tickValue === 'number') {
                        return formatCurrency(tickValue);
                    }
                },
            },
        }
    }
};
export const getWebsocketUrl = (ids: string) => `wss://ws.coincap.io/prices?assets=${ids}`;