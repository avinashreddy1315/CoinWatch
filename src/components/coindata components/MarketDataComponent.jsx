import React, { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { UseSingleCoin } from '../../cutom components and hooks/SingleCoinContext';
import { useCoin } from '../../cutom components and hooks/CoinContext';
import { styled } from '@mui/system';

const StyledTableCell1 = styled(TableCell)(({ theme }) => ({
    fontWeight: 900,
    color: 'rgb(100 116 139)',
    borderBottom: 'none',
    whiteSpace: 'nowrap', 
    overflow: 'hidden'
}));

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bolder',
    color: 'rgb(15 23 42)',
    borderBottom: 'none',
    fontSize: '15px'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

function MarketDataComponent() {
    const { coinData } = UseSingleCoin();
    const { currency } = useCoin();
    
    useEffect(() => {
        // console.log(coinData?.market_data?.market_cap?.[currency.value]);
    }, [coinData, currency.value]);

    const marketCap = coinData?.market_data?.market_cap?.[currency.value];
    const fully_diluted_valuation = coinData?.market_data?.fully_diluted_valuation?.[currency.value];
    const Circulating_Supply = coinData?.market_data?.circulating_supply;
    const total_supply = coinData?.market_data?.total_supply;
    const max_supply = coinData?.market_data?.max_supply;

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell1 sx={{ py: 1 }}>Market Cap</StyledTableCell1>
                        <StyledTableCell2 sx={{ py: 1 }}>
                            {marketCap ? `${currency.symbol}${marketCap.toLocaleString()}` : 'null'}
                        </StyledTableCell2>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell1 sx={{ py: 1 }}>Fully Diluted Valuation</StyledTableCell1>
                        <StyledTableCell2 sx={{ py: 1 }}>
                            {fully_diluted_valuation ? `${currency.symbol}${fully_diluted_valuation.toLocaleString()}` : 'null'}
                        </StyledTableCell2>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell1 sx={{ py: 1 }}>Circulating Supply</StyledTableCell1>
                        <StyledTableCell2 sx={{ py: 1 }}>
                            {Circulating_Supply ? `${Circulating_Supply.toLocaleString()}` : 'null'}
                        </StyledTableCell2>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell1 sx={{ py: 1 }}>Total Supply</StyledTableCell1>
                        <StyledTableCell2 sx={{ py: 1 }}>
                            {total_supply ? `${currency.symbol}${total_supply.toLocaleString()}` : 'null'}
                        </StyledTableCell2>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell1 sx={{ py: 1 }}>Max Supply</StyledTableCell1>
                        <StyledTableCell2 sx={{ py: 1 }}>
                            {max_supply ? `${currency.symbol}${max_supply.toLocaleString()}` : 'null'}
                        </StyledTableCell2>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MarketDataComponent;
