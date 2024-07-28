import { Thead, Tr, Th, Box } from '@chakra-ui/react';
import ArrowUpIcon from '../../assets/arrow-up.svg';
import ArrowDownIcon from '../../assets/arrow-down.svg';
import { CryptoCurrency } from '../../types/crypto-currency';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AppDispatch } from '../../types/crypto-state';
import { setSortConfig } from '../../pages/crypto-table/CryptoTableSlice';
import { useDispatch } from 'react-redux';

interface TableHeadProps {
  columnNames: Array<string>;
  onCellClick: (key: keyof CryptoCurrency, sortConfig: { key: keyof CryptoCurrency, direction: 'asc' | 'desc' }, setSortConfig: ActionCreatorWithPayload<any, "cryptoTable/setSortConfig">, dispatch: AppDispatch) => void;
  sortConfig: { key: keyof CryptoCurrency, direction: 'asc' | 'desc' };
}

const TableHead = (props: TableHeadProps) => {
  const dispatch = useDispatch();
  const handleCellClick = (key: string) => {
    if (key === 'Name' || key === 'Symbol') {
      props.onCellClick(key.toLowerCase() as keyof CryptoCurrency, props.sortConfig, setSortConfig, dispatch);
    }
  }
  return (
    <Thead>
      <Tr>
        {
          props?.columnNames?.map((columnName) => (
            <Th key={columnName} onClick={() => handleCellClick(columnName)} className={columnName === 'Name' || columnName === 'Symbol' ? 'cell-click' : ''} fontWeight={800} fontSize={16}>
              {
                columnName === 'Name' || columnName === 'Symbol' ?
                  <Box display='flex' alignItems='center'>
                    {columnName}
                    {
                      props.sortConfig.key === columnName.toLowerCase() ?
                        <img src={props.sortConfig.direction === 'asc' ? ArrowUpIcon : ArrowDownIcon} alt='arrow' /> :
                        null
                    }
                  </Box> :
                  columnName
              }
            </Th>
          ))
        }
      </Tr>
    </Thead>
  );
}

export default TableHead;