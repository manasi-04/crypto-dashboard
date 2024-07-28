import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCryptoHistory, setCryptoDetails, setLoading, setError } from './cryptoDetailsSlice';
import { AppState } from '../../types/state';
import { formatCurrency, getChangedAmount, getCryptoData } from '../../helpers/crypto';
import { getCryptoDetailsApiUrl, getCryptoHistoryApiUrl, options } from '../../helpers/constants';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';

Chart.register(...registerables);

const CryptoDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { details, history, loading, error } = useSelector((state: AppState) => state?.cryptoDetails);
    const dispatch = useDispatch();
    const changeAmount = getChangedAmount(details?.priceUsd, details?.changePercent24Hr);
    const fetchData = async () => {
        try {
            dispatch(setLoading(true));

            const [cryptoDetailsResponse, cryptoHistoryResponse] = await Promise.all([
                axios.get(getCryptoDetailsApiUrl(id)),
                axios.get(getCryptoHistoryApiUrl(id))
            ]);

            dispatch(setCryptoDetails(cryptoDetailsResponse?.data?.data));
            dispatch(setCryptoHistory(cryptoHistoryResponse?.data?.data));
            dispatch(setError(false));
        } catch (error) {
            console.error("Error fetching data:", error);
            dispatch(setError(true));
        } finally  {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage reloadCb={fetchData} message='Something went wrong !!' />
    }

    return (
        <Box display='flex' flex={1} height='100vh'>
            <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={5}>
                {details && (
                    <Box bgColor='teal' color='white' p='1em' borderRadius={4}>
                        <Text fontSize="2xl" fontWeight={600}>{details.name}</Text>
                        <Text fontSize="2xl">{formatCurrency(parseFloat(details.priceUsd))}</Text>
                        <Text>{changeAmount > 0 ? '+' : ''}{formatCurrency(changeAmount)} ({parseFloat(details.changePercent24Hr).toFixed(2)}%) Today</Text>
                    </Box>
                )}
                <Box width='90%' height='60%' display='flex' justifyContent='center' alignItems='center'>
                    <Line data={getCryptoData(history)} options={options} />
                </Box>
            </Box>
        </Box>
    );
};

export default CryptoDetailsPage;
