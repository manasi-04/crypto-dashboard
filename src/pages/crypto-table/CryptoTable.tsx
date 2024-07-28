import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { Box, Table, TableContainer } from '@chakra-ui/react';
import TableHead from '../../components/table/TableHead';
import { cryptoApiUrl, getWebsocketUrl, itemsPerPage, tableColumns } from '../../helpers/constants';
import TableBody from '../../components/table/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { setCryptosData, setError, setLoading, updateCryptoPrices } from './CryptoTableSlice';
import { AppState } from '../../types/state';
import ReactPaginate from 'react-paginate';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/error/Error';
import { setSortOrder } from '../../helpers/crypto';
import { CryptoCurrency } from '../../types/crypto-currency';
import debounce from 'lodash.debounce';

const CryptoTable = () => {
  const { cryptoCurrencies, sortConfig, loading, error } = useSelector((state: AppState) => state?.cryptoData);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  const webSocketRef = useRef<WebSocket | null>(null);

  const sortedCryptos = useMemo(() => {
    let sortedData = [...cryptoCurrencies];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a && b) {
          const aValue = (a[sortConfig.key])?.toLowerCase() || '';
          const bValue = (b[sortConfig.key])?.toLowerCase() || '';
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortedData;
  }, [cryptoCurrencies, sortConfig]);

  const offset = currentPage * itemsPerPage;
  const paginatedCryptos = sortedCryptos.slice(offset, offset + itemsPerPage);

  const handleWebSocketMessage = debounce((message: any) => {
    const data = JSON.parse(message.data);
    dispatch(updateCryptoPrices(data));
  }, 500);

  const fetchCryptocurrencies = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(cryptoApiUrl);
      dispatch(setCryptosData(response?.data?.data));
      dispatch(setError(false));
      const cryptoIds = response.data.data.map((crypto: CryptoCurrency) => crypto.id).join(',');
      const ws = new WebSocket(getWebsocketUrl(cryptoIds));
      ws.onmessage = handleWebSocketMessage;
      webSocketRef.current = ws;
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCryptocurrencies();
    // Cleanup WebSocket connection on component unmount
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage reloadCb={fetchCryptocurrencies} message='Something went wrong !!' />
  }
  return (
    <Box overflowX="auto" m='2em' borderRadius={5} border={1} borderStyle={'solid'} borderColor='#A0A0A0' height='100vh' display='flex' flexDirection='column'>
      <TableContainer flex={1} overflowY='auto'>
        <Table>
          <TableHead columnNames={tableColumns} onCellClick={setSortOrder} sortConfig={sortConfig} />
          <TableBody data={paginatedCryptos} />
        </Table>
      </TableContainer>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'pg-break'}
        pageCount={Math.ceil(cryptoCurrencies.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'pg-page'}
        pageLinkClassName={'pg-link'}
        previousClassName={'pg-page'}
        previousLinkClassName={'pg-link'}
        nextClassName={'pg-page'}
        nextLinkClassName={'pg-link'}
        breakLinkClassName={'pg-link'}
        activeClassName={'active'}
      />
    </Box>
  );
};

export default CryptoTable;
