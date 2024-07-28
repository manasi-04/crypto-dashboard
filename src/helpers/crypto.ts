import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { CryptoCurrency, CryptoHistory } from "../types/crypto-currency";
import { currentEpochTime, millisecondsInADay } from "./constants";
import { AppDispatch } from "../types/crypto-state";

export const getCryptoData = (history: CryptoHistory[]) => {
    const thirtyDaysAgoEpochTime = currentEpochTime - (30 * millisecondsInADay);
    const thiryDaysData = history.filter((point) => new Date(point.time).getTime() >= thirtyDaysAgoEpochTime);
    return {
        labels: thiryDaysData?.map((point) => new Date(point.time)?.toLocaleDateString()),
        datasets: [
            {
                label: 'Price USD',
                data: thiryDaysData?.map((point) => parseFloat(point.priceUsd)),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    }
};

export const getFavorites = () => {
    const storedData = localStorage.getItem('favorites');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return [];
    }
};

export const getSortConfig = () => {
    const storedData = sessionStorage.getItem('sortConfig');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return { key: 'name', direction: 'asc' };
    }
};

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

export const getChangedAmount = (currentPrice: string | undefined, changePercent: string | undefined) => {
    if (!currentPrice || !changePercent) {
        return 0;
    } else {
        const numberChangePercent = parseFloat(changePercent);
        const numberCurrentPrice = parseFloat(currentPrice);
        return (numberCurrentPrice * (numberChangePercent / 100));
    }
};

export const setSortOrder = (key: keyof CryptoCurrency, sortConfig: { key: keyof CryptoCurrency, direction: 'asc' | 'desc' }, setSortConfig: ActionCreatorWithPayload<any, "cryptoTable/setSortConfig">, dispatch: AppDispatch) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'asc'
    ) {
        direction = 'desc';
    }
    dispatch(setSortConfig({ key, direction }));
    sessionStorage.setItem('sortConfig', JSON.stringify({ key, direction }));
};
