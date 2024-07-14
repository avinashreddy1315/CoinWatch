import React, { useState, useEffect, useRef } from 'react';
import { useCoin } from '../../cutom components and hooks/CoinContext'; // Corrected path
import Coindataloading from './Coindataloading';
import { Table, TableHead, TableRow, TableCell, TableContainer, Paper, TableBody } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext'; // Corrected path
import { useUser } from '../../cutom components and hooks/userprovider'; // Corrected path
import { styled } from '@mui/system';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontWeight: 700,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
}));

const Cointable = () => {
  const { allCoin, loading, currency, setSearch } = useCoin();
  const [displaycoin, setDisplayCoin] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { setCoinId } = UseSingleCoin();
  const { data } = useUser();
  const [headers, setHeaders] = useState(['Rank', 'Coin', `${currency.symbol} Price`]);

  useEffect(() => {
    setDisplayCoin(allCoin);
    setPageCount(Math.ceil(allCoin.length / 10));
    if (data?.dashboard) {
      setHeaders(['Rank', 'Coin', `${currency.symbol} Price`, ...data.dashboard]);
    }
    // console.log(allCoin)
  }, [allCoin, data]);

  const showCoin = (id) => {
    console.log(id);
    setCoinId(id);
    navigate(`/wallet/${id}`);
  };

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const formatNumberWithCommas = (number) => {
    if (number == null) {
      return '0';
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getDashboardData = (coin, header) => {
    switch (header) {
      case '24h':
        return coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : '0';
      case 'Market Cap':
        return `${currency.symbol} ${formatNumberWithCommas(coin.market_cap)}`;
      default:
        return 'N/A';
    }
  };

  return (
    <div id="coindata">
      {displaycoin.length === 0 ? (
        <div>No Coin search results</div>
      ) : (
        <TableContainer component={Paper} style={{ overflowX: 'auto', height: '530px' }} ref={tableRef}>
          <Table id="coin_table" stickyHeader>
            <TableHead style={{ borderRadius: '20px' }}>
              <TableRow>
                {headers.map((head) => (
                  <TableCell
                    style={{
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 800,
                      padding: head === 'Coin' ? '10px 50px 10px 20px' : '10px 12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      backgroundColor: '#EEBC1D',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      textOverflow: 'ellipsis',
                    }}
                    key={head}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Coindataloading />
              ) : (
                displaycoin.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin) => (
                  <StyledTableRow key={coin.id} onClick={() => showCoin(coin.id)} value={coin.id}>
                    <StyledTableCell>{coin.market_cap_rank ? coin.market_cap_rank : '0'}</StyledTableCell>
                    <StyledTableCell style={{ fontSize: '15px' }}>
                      <img src={coin.image} style={{ width: '38px', paddingRight: '10px' }} />
                      {coin.symbol}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: coin.price_change_percentage_24h > 0 ? 'rgb(0, 162, 68)' : 'rgb(255, 58, 51)',
                      }}
                    >
                      {coin.price_change_percentage_24h > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{' '}
                      {currency.symbol} {formatNumberWithCommas(coin.current_price)}
                    </StyledTableCell>
                    {data?.dashboard?.map((header) => {
                      const value = getDashboardData(coin, header);
                      const isPriceChange = header === '24h';
                      const colorClass = isPriceChange
                        ? parseFloat(value) < 0
                          ? 'rgb(255, 58, 51)'
                          : 'rgb(0, 162, 68)'
                        : '';

                      return (
                        <StyledTableCell
                          key={header}
                          style={{ color: colorClass, fontWeight: 'bold' }}
                        >
                          {isPriceChange && (parseFloat(value) > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}{' '}
                          {header === '24h' ? `${value} %` : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Pagination
            count={pageCount}
            size="small"
            color="primary"
            style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center', fontWeight: 'bold', marginBottom: '5px' }}
            onChange={(_, value) => {
              setPage(value);
              scrollToTop();
            }}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default Cointable;
