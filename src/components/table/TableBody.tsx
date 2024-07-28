import { Tbody, Tr, Td, Button } from '@chakra-ui/react';
import { CryptoCurrency } from '../../types/crypto-currency';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../types/state';
import { addFavorite, removeFavorite } from '../../pages/crypto-table/CryptoTableSlice';
import favRed from "../../assets/favorite-red.svg";
import favWhite from "../../assets/favorite-white.svg";
import { formatCurrency } from '../../helpers/crypto';

interface TableBodyProps {
  data: CryptoCurrency[];
}
const TableBody = (props: TableBodyProps) => {
  const { data } = props;
  const favorites = useSelector((state: AppState) => state?.cryptoData?.favorites);
  const dispatch = useDispatch();
  const toggleFavorite = (id: string) => {
    if (favorites?.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  useEffect(() => {
    localStorage?.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  return (
    <Tbody>
      {data?.map((crypto) => (
        <Tr key={crypto.id}>
          <Td>{crypto.symbol}</Td>
          <Td color='#008080'>
            <Link to={`/details/${crypto.id}`}>{crypto.name}</Link>
          </Td>
          <Td>{formatCurrency(parseFloat(crypto.priceUsd))}</Td>
          <Td>{formatCurrency(parseFloat(crypto.marketCapUsd))}</Td>
          <Td>
            <Button onClick={() => toggleFavorite(crypto.id)}>
              {favorites?.includes(crypto.id) ? <img src={favRed} alt='fav-red-icon' /> : <img src={favWhite} alt='fav-white-icon' />}
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  )
}

export default TableBody;